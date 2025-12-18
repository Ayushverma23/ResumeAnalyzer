
from src.features.resume.services.analyzer import ResumeAnalyzer
from src.features.resume.services.generator import ResumeGenerator
from src.features.resume.services.scorer import ATSScorer
from src.features.resume.services.prompts import AIPrompts
from src.features.ai.services.factory import AIFactory
from src.features.resume.services.orchestrator_core import OrchestratorConfig
from src.features.resume.services.layout_engine import LayoutEngine

class OrchestratorStream:
    @staticmethod
    async def optimize_resume_stream(resume_text: str, jd_text: str, provider_name: str = "gemini", initial_analysis: dict = None, pdf_bytes: bytes = None):
        execution_log = []
        
        layout_template = None
        if pdf_bytes:
             yield {"status": "analyzing", "message": "Extracting Visual Layout from PDF..."}
             try:
                 layout_template = await LayoutEngine.extract_layout_template(pdf_bytes)
                 execution_log.append({"step": "layout", "status": "success"})
             except Exception as e:
                 execution_log.append({"step": "layout", "error": str(e)})

        if initial_analysis:
            yield {"status": "analyzing", "message": "Using cached analysis..."}
            analysis = initial_analysis
        else:
            yield {"status": "analyzing", "message": "Analyzing Resume vs JD..."}
            analysis = await ResumeAnalyzer.analyze(resume_text, jd_text, provider_name)
        
        execution_log.append({"step": "analysis", "data": analysis})
        yield {"status": "analyzed", "data": analysis}

        yield {"status": "drafting", "message": "Generating first draft..."}
        current_latex = await ResumeGenerator.generate_latex(resume_text, jd_text, analysis, provider_name, layout_template)
        
        best_latex = current_latex
        best_score_data = {"score": 0}

        for attempt in range(OrchestratorConfig.MAX_RETRIES + 1):
            yield {"status": "scoring", "message": f"Scoring Draft {attempt + 1}..."}
            
            score_data = await ATSScorer.score(current_latex, jd_text, provider_name)
            current_score = score_data.get("score", 0)
            
            yield {
                "status": "scored", 
                "score": current_score, 
                "feedback": score_data.get("feedback"),
                "attempt": attempt + 1
            }

            if current_score > best_score_data.get("score", 0):
                best_latex = current_latex
                best_score_data = score_data

            if current_score >= OrchestratorConfig.TARGET_SCORE:
                yield {"status": "info", "message": "Target score reached!"}
                break
                
            if attempt == OrchestratorConfig.MAX_RETRIES:
                yield {"status": "info", "message": "Max retries reached."}
                break

            yield {"status": "refining", "message": f"Refining based on feedback (Attempt {attempt + 1})..."}
            feedback_str = str(score_data)
            prompt = AIPrompts.refine_resume(current_latex, jd_text, feedback_str)
            provider = AIFactory.get_provider(provider_name)
            response_text = await provider.generate_response(prompt)
            current_latex = ResumeGenerator._clean_latex_string(response_text)

        yield {
            "status": "complete",
            "payload": {
                "latex_code": best_latex,
                "final_score": best_score_data.get("score", 0),
                "execution_log": execution_log
            }
        }
