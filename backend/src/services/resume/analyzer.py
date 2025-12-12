import json
import re
from backend.src.services.ai.factory import AIFactory
from backend.src.services.resume.prompts import AIPrompts

class ResumeAnalyzer:
    @staticmethod
    async def analyze(resume_text: str, jd_text: str, provider_name: str = "gemini") -> dict:
        """
        Analyzes a resume against a JD using the specified AI provider.
        """
        prompt = AIPrompts.analyze_resume(resume_text, jd_text)
        
        provider = AIFactory.get_provider(provider_name)
        response_text = await provider.generate_response(prompt)
        
        # Clean response to ensure valid JSON
        cleaned_text = ResumeAnalyzer._clean_json_string(response_text)
        
        try:
            return json.loads(cleaned_text)
        except json.JSONDecodeError:
            # Fallback: try to find JSON blob if mostly text
            return {
                "score": 0,
                "summary": "Error parsing AI response.",
                "raw_response": response_text
            }

    @staticmethod
    def _clean_json_string(text: str) -> str:
        # Remove markdown code blocks
        text = re.sub(r"```json\s*", "", text)
        text = re.sub(r"```", "", text)
        return text.strip()

if __name__ == "__main__":
    print("ResumeAnalyzer Service Ready.")
