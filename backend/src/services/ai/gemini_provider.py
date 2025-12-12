import google.generativeai as genai
from src.core.config import settings
from src.services.ai.base import LLMProvider

class GeminiProvider(LLMProvider):
    def __init__(self):
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY is not set.")
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        try:
            # Gemini 1.5 supports system instruction via constructor, but for simplicity we modify prompt 
            # or usage depends on library version. Let's prepend for now or use valid kargs if supported.
            full_prompt = prompt
            if system_instruction:
                full_prompt = f"System Instruction: {system_instruction}\n\nUser Task: {prompt}"

            response = await self.model.generate_content_async(full_prompt)
            return response.text
        except Exception as e:
            return f"Gemini Error: {str(e)}"

if __name__ == "__main__":
    import asyncio
    
    async def test_gemini():
        print("Testing Gemini Provider...")
        try:
            provider = GeminiProvider()
            response = await provider.generate_response("Say 'Hello, I wait for your resume!'")
            print(f"Gemini Response: {response}")
        except Exception as e:
            print(f"Test Failed: {e}")

    asyncio.run(test_gemini())
