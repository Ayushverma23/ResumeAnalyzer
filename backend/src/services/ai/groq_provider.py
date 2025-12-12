from groq import Groq
from src.core.config import settings
from src.services.ai.base import LLMProvider

class GroqProvider(LLMProvider):
    def __init__(self):
        if not settings.GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY is not set.")
        
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        # Using Llama3-8b for speed and efficiency as default
        self.model = "llama3-8b-8192"

    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        try:
            messages = []
            if system_instruction:
                messages.append({"role": "system", "content": system_instruction})
            
            messages.append({"role": "user", "content": prompt})

            completion = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=2048
            )
            return completion.choices[0].message.content
        except Exception as e:
            return f"Groq Error: {str(e)}"

if __name__ == "__main__":
    import asyncio
    
    async def test_groq():
        print("Testing Groq Provider...")
        try:
            provider = GroqProvider()
            response = await provider.generate_response("Say 'Hello from Groq!'")
            print(f"Groq Response: {response}")
        except Exception as e:
            print(f"Test Failed: {e}")

    asyncio.run(test_groq())
