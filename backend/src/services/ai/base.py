from abc import ABC, abstractmethod

class LLMProvider(ABC):
    """
    Abstract Base Class for LLM Providers (Gemini, Groq, HF).
    """

    @abstractmethod
    async def generate_response(self, prompt: str, system_instruction: str = None) -> str:
        """
        Generates a text response for the given prompt.
        
        Args:
            prompt (str): The user prompt.
            system_instruction (str, optional): System-level instruction.

        Returns:
            str: The generated response.
        """
        pass

if __name__ == "__main__":
    print("LLMProvider Interface Definition is valid.")
