
import json
from src.features.ai.services.factory import AIFactory
from src.features.resume.services.prompts import AIPrompts
from src.features.resume.services.analyzer import ResumeAnalyzer

class ATSScorer:
    @staticmethod
    async def score(latex_content: str, jd_text: str, provider_name: str = "gemini") -> dict:
        prompt = AIPrompts.score_resume_ats(latex_content, jd_text)
        
        provider = AIFactory.get_provider(provider_name)
        response_text = await provider.generate_response(prompt)
        
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
