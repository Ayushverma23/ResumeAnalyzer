from huggingface_hub import InferenceClient
from src.core.config import settings
from src.services.ai.base import LLMProvider

class HFProvider(LLMProvider):
    def __init__(self):
        if not settings.HF_TOKEN:
            raise ValueError("HF_TOKEN is not set.")
        
        self.client = InferenceClient(token=settings.HF_TOKEN)
        # Using a solid instruction-tuned model from HF
        self.model = "meta-llama/Meta-Llama-3-8B-Instruct"

    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        try:
            # Structuring prompt for Llama 3 or generic chat-template if possible
            # HF API often takes messages list for chat models
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
            # Fallback for models not supporting chat_completion or different API structure
            return f"HF Error: {str(e)}"

if __name__ == "__main__":
    import asyncio
    
    async def test_hf():
        print("Testing HuggingFace Provider...")
        try:
            provider = HFProvider()
            response = await provider.generate_response("Say 'Hello from HuggingFace!'")
            print(f"HF Response: {response}")
        except Exception as e:
            print(f"Test Failed: {e}")

    asyncio.run(test_hf())
