import { AnalysisResult, GenerateResult, StreamUpdate } from "@/types";

const API_URL = "http://localhost:8000/api";

export const APIService = {
    analyzeResume: async (file: File, jobDescription: string, provider: string): Promise<AnalysisResult> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("jd", jobDescription);
        formData.append("provider", provider);

        const response = await fetch(`${API_URL}/resume/analyze`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Analysis failed");
        }

        return response.json();
    },

    generateResume: async (resumeText: string, jdText: string, analysis: AnalysisResult, provider: string): Promise<GenerateResult> => {
        const response = await fetch(`${API_URL}/resume/generate`, {
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
        analysis: AnalysisResult,
        provider: string,
        onUpdate: (update: StreamUpdate) => void
    ): Promise<GenerateResult> => {
        const response = await fetch(`${API_URL}/resume/generate_stream`, {
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
