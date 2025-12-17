from src.services.resume.analyzer import ResumeAnalyzer
from src.services.resume.generator import ResumeGenerator
from src.services.resume.scorer import ATSScorer
from src.services.ai.factory import AIFactory
from src.services.resume.prompts import AIPrompts

class AgenticOrchestrator:
    MAX_RETRIES = 2
    TARGET_SCORE = 85

    @staticmethod
    async def optimize_resume(resume_text: str, jd_text: str, provider_name: str = "gemini", initial_analysis: dict = None) -> dict:
        """
        Orchestrates the full Resume Optimization Process:
        1. Analyze (Initial) - Skipped if initial_analysis provided
        2. Generate (Draft 1)
        3. Loop:
            a. Score
            b. If score >= TARGET or Max Retries -> Break
            c. Refine (Generate Draft N+1)
        """
        execution_log = []

        # Step 1: Initial Analysis
        if initial_analysis:
            print("--- Step 1: Using Initial Analysis ---")
            analysis = initial_analysis
        else:
            print("--- Step 1: Analyzing Resume ---")
            analysis = await ResumeAnalyzer.analyze(resume_text, jd_text, provider_name)
        
        execution_log.append({"step": "analysis", "data": analysis})

        # Step 2: Generate First Draft
        print("--- Step 2: Generating First Draft ---")
        current_latex = await ResumeGenerator.generate_latex(resume_text, jd_text, analysis, provider_name)
        
        best_latex = current_latex
        best_score_data = {"score": 0}

        # Step 3: Optimization Loop
        for attempt in range(AgenticOrchestrator.MAX_RETRIES + 1):
            print(f"--- Optimization Loop {attempt + 1} ---")
            
            # Score
            score_data = await ATSScorer.score(current_latex, jd_text, provider_name)
            current_score = score_data.get("score", 0)
            print(f"Current Score: {current_score}")
            
            execution_log.append({
                "attempt": attempt + 1, 
                "score": current_score, 
                "feedback": score_data.get("feedback")
            })

            # Update Best
            if current_score > best_score_data.get("score", 0):
                best_latex = current_latex
                best_score_data = score_data

            # Check termination
            if current_score >= AgenticOrchestrator.TARGET_SCORE:
                print("Target score reached!")
                break
                
            if attempt == AgenticOrchestrator.MAX_RETRIES:
                print("Max retries reached.")
                break

            # Refine
            print("--- Refinement Needed ---")
            feedback_str = str(score_data)
            
            # We treat refinement as a special generation generation call
            prompt = AIPrompts.refine_resume(current_latex, jd_text, feedback_str)
            provider = AIFactory.get_provider(provider_name)
            response_text = await provider.generate_response(prompt)
            current_latex = ResumeGenerator._clean_latex_string(response_text)

        return {
            "final_latex": best_latex,
            "final_score": best_score_data,
            "execution_log": execution_log
        }

    @staticmethod
    async def optimize_resume_stream(resume_text: str, jd_text: str, provider_name: str = "gemini", initial_analysis: dict = None):
        """
        Async Generator for Streaming Updates.
        Yields JSON strings with status and data.
        """
        execution_log = []
        
        # Step 1: Analysis
        if initial_analysis:
            yield {"status": "analyzing", "message": "Using cached analysis..."}
            analysis = initial_analysis
        else:
            yield {"status": "analyzing", "message": "Analyzing Resume vs JD..."}
            analysis = await ResumeAnalyzer.analyze(resume_text, jd_text, provider_name)
        
        execution_log.append({"step": "analysis", "data": analysis})
        yield {"status": "analyzed", "data": analysis}

        # Step 2: Generation
        yield {"status": "drafting", "message": "Generating first draft..."}
        current_latex = await ResumeGenerator.generate_latex(resume_text, jd_text, analysis, provider_name)
        
        best_latex = current_latex
        best_score_data = {"score": 0}

        # Step 3: Loop
        for attempt in range(AgenticOrchestrator.MAX_RETRIES + 1):
            yield {"status": "scoring", "message": f"Scoring Draft {attempt + 1}..."}
            
            # Score
            score_data = await ATSScorer.score(current_latex, jd_text, provider_name)
            current_score = score_data.get("score", 0)
            
            yield {
                "status": "scored", 
                "score": current_score, 
                "feedback": score_data.get("feedback"),
                "attempt": attempt + 1
            }

            execution_log.append({
                "attempt": attempt + 1, 
                "score": current_score, 
                "feedback": score_data.get("feedback")
            })

            if current_score > best_score_data.get("score", 0):
                best_latex = current_latex
                best_score_data = score_data

            if current_score >= AgenticOrchestrator.TARGET_SCORE:
                yield {"status": "info", "message": "Target score reached!"}
                break
                
            if attempt == AgenticOrchestrator.MAX_RETRIES:
                yield {"status": "info", "message": "Max retries reached."}
                break

            # Refine
            yield {"status": "refining", "message": f"Refining based on feedback (Attempt {attempt + 1})..."}
            feedback_str = str(score_data)
            
            prompt = AIPrompts.refine_resume(current_latex, jd_text, feedback_str)
            provider = AIFactory.get_provider(provider_name)
            response_text = await provider.generate_response(prompt)
            current_latex = ResumeGenerator._clean_latex_string(response_text)

        # Final Result
        yield {
            "status": "complete",
            "payload": {
                "latex_code": best_latex,
                "final_score": best_score_data.get("score", 0),
                "execution_log": execution_log
            }
        }
