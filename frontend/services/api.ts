const API_URL = "http://localhost:8000/api";

export interface AnalysisResult {
    score: number;
    summary: string;
    missing_keywords: string[];
    strong_points: string[];
    weak_points: string[];
    raw_text: string;
}

export interface GenerateResult {
    latex_code: string;
}

export const APIService = {
    analyzeResume: async (file: File, jobDescription: string, provider: string): Promise<AnalysisResult> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("jd", jobDescription);
        formData.append("provider", provider);

        const response = await fetch(`${API_URL}/analyze`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Analysis failed");
        }

        return response.json();
    },

    generateResume: async (resumeText: string, jdText: string, analysis: any, provider: string): Promise<GenerateResult> => {
        const response = await fetch(`${API_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                resume_text: resumeText,
                jd_text: jdText,
                analysis: analysis,
                provider: provider
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Generation failed");
        }

        return response.json();
    }
};
