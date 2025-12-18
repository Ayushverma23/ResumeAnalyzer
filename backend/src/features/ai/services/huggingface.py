
from huggingface_hub import InferenceClient
from src.core.config import get_settings
from src.features.ai.services.base import LLMProvider

class HFProvider(LLMProvider):
    def __init__(self):
        settings = get_settings()
        if not settings.HF_TOKEN:
            raise ValueError("HF_TOKEN is not set.")
        
        self.client = InferenceClient(token=settings.HF_TOKEN)
        self.model = "meta-llama/Meta-Llama-3-8B-Instruct"

    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        try:
            messages = []
            if system_instruction:
                messages.append({"role": "system", "content": system_instruction})
            
            messages.append({"role": "user", "content": prompt})

            response = self.client.chat_completion(
                model=self.model,
                messages=messages,
                max_tokens=2048,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"HF Error: {str(e)}"
