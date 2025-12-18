
from src.features.resume.services.analyzer import ResumeAnalyzer
from src.features.resume.services.generator import ResumeGenerator
from src.features.resume.services.scorer import ATSScorer
from src.features.resume.services.prompts import AIPrompts
from src.features.ai.services.factory import AIFactory
from src.features.resume.services.orchestrator_core import OrchestratorConfig

class OrchestratorFlow:
    @staticmethod
    async def optimize_resume(resume_text: str, jd_text: str, provider_name: str = "gemini", initial_analysis: dict = None) -> dict:
        execution_log = []

        # Step 1: Initial Analysis
        if initial_analysis:
            analysis = initial_analysis
        else:
            analysis = await ResumeAnalyzer.analyze(resume_text, jd_text, provider_name)
        
        execution_log.append({"step": "analysis", "data": analysis})

        # Step 2: Generate First Draft
        current_latex = await ResumeGenerator.generate_latex(resume_text, jd_text, analysis, provider_name)
        
        best_latex = current_latex
        best_score_data = {"score": 0}

        # Step 3: Optimization Loop
        for attempt in range(OrchestratorConfig.MAX_RETRIES + 1):
            score_data = await ATSScorer.score(current_latex, jd_text, provider_name)
            current_score = score_data.get("score", 0)
            
            execution_log.append({
                "attempt": attempt + 1, 
                "score": current_score, 
                "feedback": score_data.get("feedback")
            })

            if current_score > best_score_data.get("score", 0):
                best_latex = current_latex
                best_score_data = score_data

            if current_score >= OrchestratorConfig.TARGET_SCORE:
                break
                
            if attempt == OrchestratorConfig.MAX_RETRIES:
                break

            # Refine
            feedback_str = str(score_data)
            prompt = AIPrompts.refine_resume(current_latex, jd_text, feedback_str)
            provider = AIFactory.get_provider(provider_name)
            response_text = await provider.generate_response(prompt)
            current_latex = ResumeGenerator._clean_latex_string(response_text)

        return {
            "final_latex": best_latex,
            "final_score": best_score_data,
            "execution_log": execution_log
        }
