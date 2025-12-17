import { useState } from "react"
import { APIService } from "@/services/api"

export const useResumeAnalysis = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [file, setFile] = useState<File | null>(null)
    const [jobDescription, setJobDescription] = useState("")
    const [selectedModel, setSelectedModel] = useState("gemini")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [streamStatus, setStreamStatus] = useState({ status: "idle", message: "" })
    const [streamLogs, setStreamLogs] = useState<any[]>([])

    const handleAnalyze = async () => {
        if (!file || !jobDescription) return

        setIsAnalyzing(true)
        setStreamLogs([])
        setStreamStatus({ status: "analyzing", message: "Starting Analysis..." })

        try {
            const analysisResult = await APIService.analyzeResume(file, jobDescription, selectedModel)
            setStreamLogs(prev => [...prev, { message: "Initial Analysis Complete", data: analysisResult }])

            // Switch to Streaming Generation
            const generationResult = await APIService.generateResumeStream(
                analysisResult.raw_text,
                jobDescription,
                analysisResult,
                selectedModel,
                (update) => {
                    // Real-time update handler
                    if (update.status && update.status !== "complete") {
                        setStreamStatus({ status: update.status, message: update.message || update.status })

                        // Add significant updates to log
                        if (update.score || update.feedback || update.message) {
                            setStreamLogs(prev => [...prev, update])
                        }
                    }
                }
            )

            setResult({
                score: generationResult.final_score || analysisResult.score,
                summary: analysisResult.summary,
                generated_latex: generationResult.latex_code,
                logs: generationResult.execution_log
            })
            setStep(2)
        } catch (error) {
            alert("Error: " + (error as Error).message)
        } finally {
            setIsAnalyzing(false)
            setStreamStatus({ status: "idle", message: "" })
        }
    }

    return {
        step,
        file,
        setFile,
        jobDescription,
        setJobDescription,
        selectedModel,
        setSelectedModel,
        isAnalyzing,
        streamStatus,
        streamLogs,
        result,
        handleAnalyze
    }
}
