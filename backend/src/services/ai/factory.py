from backend.src.services.ai.base import LLMProvider
from backend.src.services.ai.gemini_provider import GeminiProvider
from backend.src.services.ai.groq_provider import GroqProvider
from backend.src.services.ai.hf_provider import HFProvider

class AIFactory:
    @staticmethod
    def get_provider(provider_name: str) -> LLMProvider:
        """
        Returns an instance of the requested AI Provider.
        
        Args:
            provider_name (str): 'gemini', 'groq', or 'huggingface'
            
        Returns:
            LLMProvider: The concrete implementation.
            
        Raises:
            ValueError: If provider is unknown.
        """
        name = provider_name.lower().strip()
        
        if name == "gemini":
            return GeminiProvider()
        elif name == "groq":
            return GroqProvider()
        elif name == "huggingface" or name == "hf":
            return HFProvider()
        else:
            raise ValueError(f"Unknown AI Provider: {provider_name}")

if __name__ == "__main__":
    import asyncio
    
    async def test_factory():
        print("Testing AI Factory...")
        try:
            # We expect this to fail if keys aren't set, but we test the factory logic
            print("Requesting Gemini...")
            provider = AIFactory.get_provider("gemini")
            print(f"Got: {type(provider).__name__}")
        except Exception as e:
            print(f"Factory Test (Gemini) caught expected error: {e}")

    asyncio.run(test_factory())
