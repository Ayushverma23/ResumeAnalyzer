import io
from pypdf import PdfReader

class ResumeParser:
    """
    Service to extract text from PDF resumes.
    """
    
    @staticmethod
    def extract_text(file_content: bytes) -> str:
        """
        Extracts text from a PDF file content (bytes).
        
        Args:
            file_content (bytes): The raw bytes of the PDF file.
            
        Returns:
            str: The extracted text.
            
        Raises:
            ValueError: If the file is not a valid PDF or text extraction fails.
        """
        try:
            # Create a file-like object from bytes
            pdf_file = io.BytesIO(file_content)
            reader = PdfReader(pdf_file)
            
            text = []
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text.append(extracted)
            
            full_text = "\n".join(text)
            
            if not full_text.strip():
                raise ValueError("No text could be extracted. The PDF might be an image scan.")
                
            return full_text
            
        except Exception as e:
             raise ValueError(f"PDF parsing error: {str(e)}")

if __name__ == "__main__":
    print("ResumeParser Service is ready.")
    # Mock test
    try:
        # Pass garbage bytes to test error handling
        ResumeParser.extract_text(b"not a pdf")
    except ValueError as e:
        print(f"Caught expected error: {e}")
