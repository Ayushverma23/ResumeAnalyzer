
import json
import re
from src.features.ai.services.factory import AIFactory
from src.features.resume.services.prompts import AIPrompts

class ResumeAnalyzer:
    @staticmethod
    async def analyze(resume_text: str, jd_text: str, provider_name: str = "gemini") -> dict:
        prompt = AIPrompts.analyze_resume(resume_text, jd_text)
        
        provider = AIFactory.get_provider(provider_name)
        response_text = await provider.generate_response(prompt)
        
        cleaned_text = ResumeAnalyzer._clean_json_string(response_text)
        
        try:
            return json.loads(cleaned_text)
        except json.JSONDecodeError:
            return {
                "score": 0,
                "summary": "Error parsing AI response.",
                "raw_response": response_text
            }

    @staticmethod
    def _clean_json_string(text: str) -> str:
        text = re.sub(r"```json\s*", "", text)
        text = re.sub(r"```", "", text)
        return text.strip()
