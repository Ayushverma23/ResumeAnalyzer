
import re
from src.features.ai.services.factory import AIFactory
from src.features.resume.services.prompts import AIPrompts

class ResumeGenerator:
    @staticmethod
    async def generate_latex(resume_text: str, jd_text: str, analysis_json: dict, provider_name: str = "gemini") -> str:
        analysis_str = str(analysis_json)
        prompt = AIPrompts.generate_latex_resume(resume_text, jd_text, analysis_str)
        
        provider = AIFactory.get_provider(provider_name)
        response_text = await provider.generate_response(prompt)
        
        return ResumeGenerator._clean_latex_string(response_text)

    @staticmethod
    def _clean_latex_string(text: str) -> str:
        text = re.sub(r"```latex\s*", "", text)
        text = re.sub(r"```tex\s*", "", text)
        text = re.sub(r"```", "", text)
        return text.strip()
