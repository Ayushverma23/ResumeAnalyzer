
import google.generativeai as genai
from src.core.config import get_settings
from src.features.ai.services.base import LLMProvider

class GeminiProvider(LLMProvider):
    def __init__(self):
        settings = get_settings()
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY is not set.")
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        try:
            full_prompt = prompt
            if system_instruction:
                full_prompt = f"System Instruction: {system_instruction}\n\nUser Task: {prompt}"

            response = await self.model.generate_content_async(full_prompt)
            return response.text
        except Exception as e:
            return f"Gemini Error: {str(e)}"
