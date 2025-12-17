import json
from src.services.ai.factory import AIFactory
from src.services.resume.prompts import AIPrompts
from src.services.resume.analyzer import ResumeAnalyzer

class ATSScorer:
    @staticmethod
    async def score(latex_content: str, jd_text: str, provider_name: str = "gemini") -> dict:
        """
        Scores the generated LaTeX resume against the JD.
        """
        prompt = AIPrompts.score_resume_ats(latex_content, jd_text)
        
        provider = AIFactory.get_provider(provider_name)
        response_text = await provider.generate_response(prompt)
        
        # Reuse the cleaning logic from Analyzer
        cleaned_text = ResumeAnalyzer._clean_json_string(response_text)
        
        try:
            return json.loads(cleaned_text)
        except json.JSONDecodeError:
            return {
                "score": 0,
                "missing_keywords": [],
                "feedback": "Error parsing ATS Score response.",
                "raw_response": response_text
            }
