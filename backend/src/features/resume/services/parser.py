
import io
from pypdf import PdfReader

class ResumeParser:
    """Service to extract text from PDF resumes."""
    
    @staticmethod
    def extract_text(file_content: bytes) -> str:
        try:
            pdf_file = io.BytesIO(file_content)
            reader = PdfReader(pdf_file)
            
            text = []
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text.append(extracted)
            
            full_text = "\n".join(text)
            
            if not full_text.strip():
                raise ValueError("No text extracted. PDF might be an image scan.")
                
            return full_text
            
        except Exception as e:
             raise ValueError(f"PDF parsing error: {str(e)}")
