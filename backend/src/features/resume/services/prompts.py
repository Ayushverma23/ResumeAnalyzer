
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

    @staticmethod
    def score_resume_ats(latex_content: str, jd_text: str) -> str:
        return f"""
        Act as a strict ATS (Applicant Tracking System) and Senior Technical Recruiter.
        
        Evaluate the following LaTeX Resume content against the provided Job Description.
        
        JOB DESCRIPTION:
        {jd_text}
        
        RESUME CONTENT (LATEX):
        {latex_content}
        
        Task:
        1. Calculate a match score (0-100) based on keyword overlap, skills match, and relevance.
        2. Identify specific missing keywords (skills, tools, certifications) that are CRITICAL in the JD but missing in the resume.
        3. Provide specific, actionable feedback on how to improve the resume to get a higher score.
        
        Output ONLY valid JSON with this structure:
        {{
            "score": <number>,
            "missing_keywords": ["keyword1", "keyword2", ...],
            "feedback": "Specific instructions for improvement..."
        }}
        """

    @staticmethod
    def refine_resume(current_latex: str, jd_text: str, feedback_json: str) -> str:
        return f"""
        Act as an Elite Professional Resume Writer.
        
        Your goal is to IMPROVE the following resume to achieve a 100% match with the Job Description, based on the specific feedback provided.
        
        PREVIOUS LATEX:
        {current_latex}
        
        JOB DESCRIPTION:
        {jd_text}
        
        FEEDBACK & MISSING KEYWORDS:
        {feedback_json}
        
        INSTRUCTIONS:
        1. Keep the existing LaTeX structure and formatting (unless specifically told to fix it).
        2. Integrating the missing keywords naturally into the Experience, Skills, or Summary sections. Do not just list them; incorporate them into bullet points if possible.
        3. Address all the feedback points.
        4. Output the FULL, UPDATED LaTeX code.
        
        Output ONLY the LaTeX code.
        """

    @staticmethod
    def inject_content_into_template(resume_text: str, jd_text: str, analysis_json: str, layout_template: str) -> str:
        return f"""
        Act as a Professional Resume Writer.
        
        Your task is to rewrite the candidate's resume content to match the Job Description, and then INSERT that content into the provided LaTeX Template.
        
        You must PRESERVE the `layout_template` structure exactly. Do not change the margins, fonts, or section ordering.
        ONLY replace the placeholder text (like {{SUMMARY}}, {{EXPERIENCE_SECTION}}, etc.) or the generic body text with the optimized content.
        
        Information Source:
        RESUME: {resume_text}
        
        Target:
        JOB DESCRIPTION: {jd_text}
        
        Guidance:
        ANALYSIS: {analysis_json}
        
        Target Layout (LaTeX Template):
        {layout_template}
        
        INSTRUCTIONS:
        1. Write a High-Impact Summary focused on the JD.
        2. Rewrite work experience bullets to show impact (STAR method), incorporating missing keywords from the Analysis.
        3. Fill the Education and Skills sections.
        4. OUTPUT the final, complete LaTeX code with the NEW content inserted into the TEMPLATE.
        5. Ensure the code is valid LaTeX.
        """
