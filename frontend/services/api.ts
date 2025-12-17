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
    final_score?: number;
    execution_log?: any[];
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
    },

    generateResumeStream: async (
        resumeText: string,
        jdText: string,
        analysis: any,
        provider: string,
        onUpdate: (update: any) => void
    ): Promise<GenerateResult> => {
        const response = await fetch(`${API_URL}/generate_stream`, {
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
            throw new Error(error.detail || "Stream Generation failed");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let finalResult: GenerateResult | null = null;

        if (reader) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const update = JSON.parse(line);
                            onUpdate(update);

                            if (update.status === "complete") {
                                finalResult = update.payload;
                            }
                        } catch (e) {
                            console.error("Error parsing stream line:", line, e);
                        }
                    }
                }
            }
        }

        if (!finalResult) throw new Error("Stream ended without completion payload");
        return finalResult;
    }
};
