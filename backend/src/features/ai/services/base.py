
from abc import ABC, abstractmethod

class LLMProvider(ABC):
    """Abstract Base Class for LLM Providers."""

    @abstractmethod
    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        """Generates a text response for the given prompt."""
        pass
