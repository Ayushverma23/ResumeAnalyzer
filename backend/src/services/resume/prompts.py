class AIPrompts:
    
    @staticmethod
    def analyze_resume(resume_text: str, jd_text: str) -> str:
        return f"""
        Act as a Senior Technical Recruiter and Career Coach.
        
        Analyze the following Resume against the Job Description (JD).
        
        JOB DESCRIPTION:
        {jd_text}
        
        RESUME:
        {resume_text}
        
        Provide a structured JSON response with the following fields:
        1. "score": A score from 0-100 based on relevance.
        2. "summary": A brief summary of the match.
        3. "missing_keywords": A list of important keywords/skills from the JD missing in the resume.
        4. "strong_points": A list of things the candidate did well.
        5. "weak_points": A list of areas for improvement (formatting, clarity, impact).
        
        Output ONLY valid JSON. Do not include markdown formatting like ```json.
        """

    @staticmethod
    def generate_latex_resume(resume_text: str, jd_text: str, analysis_json: str) -> str:
        return f"""
        Act as a Professional Resume Writer. Your task is to rewrite the candidate's resume to perfectly match the Job Description, fixing the weak points identified.
        
        You MUST output the result as a COMPLETE, COMPILABLE LaTeX (.tex) code.
        
        RULES:
        1. Use a clean, modern, professional LaTeX template (e.g., using 'geometry', 'hyperref', 'enumitem').
        2. Ensure the content is optimized for partial-matching algorithms (ATS friendly).
        3. Do NOT use placeholder text. Use the actual candidate's information from the RESUME provided, but rephrase it to highlight the skills in the JD.
        4. If the candidate lacks a specific skill mentioned in the JD, do NOT lie, but emphasize related transferable skills.
        5. Output ONLY the LaTeX code. Start with \\documentclass and end with \\end{{document}}.
        
        RESUME CONTENT:
        {resume_text}
        
        JOB DESCRIPTION:
        {jd_text}
        
        ANALYSIS FEEDBACK:
        {analysis_json}
        
        GENERATE LATEX NOW:
        """

if __name__ == "__main__":
    print("AIPrompts Class Loaded.")
