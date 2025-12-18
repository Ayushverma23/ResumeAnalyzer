
from src.features.ai.services.base import LLMProvider
from src.features.ai.services.gemini import GeminiProvider
from src.features.ai.services.groq import GroqProvider
from src.features.ai.services.huggingface import HFProvider

class AIFactory:
    @staticmethod
    def get_provider(provider_name: str) -> LLMProvider:
        name = provider_name.lower().strip()
        
        if name == "gemini":
            return GeminiProvider()
        elif name == "groq":
            return GroqProvider()
        elif name in ["huggingface", "hf"]:
            return HFProvider()
        else:
            raise ValueError(f"Unknown AI Provider: {provider_name}")
