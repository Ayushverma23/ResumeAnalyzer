
import google.generativeai as genai
from src.core.config import get_settings
import re

class LayoutEngine:
    """
    Uses a Vision-capable model (Gemini Flash) to extract the Visual Structure (LaTeX)
    from a PDF file, independent of the 'Content' model.
    """
    
    @staticmethod
    async def extract_layout_template(pdf_content: bytes) -> str:
        settings = get_settings()
        
        # We ALWAYS use Gemini Flash for Vision tasks, as it's the most efficient Multimodal model available.
        # This allows us to support "Visual Preservation" even if the user selects Groq/HF for text.
        if not settings.GEMINI_API_KEY:
             # Fallback or error if system capability is missing
             raise ValueError("System Vision Capability (Gemini API) is required for layout preservation.")

        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-2.5-flash")
        
        prompt = """
        I am going to provide you with a Resume PDF.
        Your task is to RECREATE the EXACT VISUAL LAYOUT of this resume using LaTeX.
        
        RULES:
        1. PRESERVE: Margins, Fonts (closest match), Header styles, Column structure, Colors (hex codes).
        2. PLACEHOLDERS: Do NOT include the specific content. Instead, use placeholders like:
           - {{NAME}}, {{EMAIL}}, {{PHONE}} for header info.
           - {{SUMMARY}} for the summary section.
           - {{EXPERIENCE_SECTION}} for the entire work history block.
           - {{EDUCATION_SECTION}} for the education block.
           - {{SKILLS_SECTION}} for skills.
        3. OUTPUT: Return ONLY the raw LaTeX code. Do not wrap in markdown blocks.
        4. COMPILATION: The LaTeX code MUST be valid and compilable. Use standard packages (geometry, enumitem, hyperref).
        """
        
        # Prepare the image parts (PDF bytes)
        # Gemini expects 'mime_type' for PDF data
        pdf_part = {
            "mime_type": "application/pdf",
            "data": pdf_content
        }
        
        try:
            response = await model.generate_content_async([prompt, pdf_part])
            return LayoutEngine._clean_latex_output(response.text)
        except Exception as e:
            print(f"Layout Extraction Failed: {e}")
            # Fallback to a standard template if vision fails
            return LayoutEngine._get_fallback_template()

    @staticmethod
    def _clean_latex_output(text: str) -> str:
        text = re.sub(r"```latex\s*", "", text)
        text = re.sub(r"```tex\s*", "", text)
        text = re.sub(r"```", "", text)
        return text.strip()

    @staticmethod
    def _get_fallback_template() -> str:
        return r"""
\documentclass[a4paper,10pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{geometry}
\geometry{margin=1in}
\begin{document}
\section*{Resume Layout Extraction Failed}
This is a fallback template. The system could not visually clone your PDF.
\end{document}
"""
