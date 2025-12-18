import { useState } from "react"
import { APIService } from "@/services/api"
import { AnalysisResult, GenerateResult, StreamUpdate, LogItem } from "@/types"

export const useResumeAnalysis = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [file, setFile] = useState<File | null>(null)
    const [jobDescription, setJobDescription] = useState("")
    const [selectedModel, setSelectedModel] = useState("gemini")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<GenerateResult | null>(null)
    const [streamStatus, setStreamStatus] = useState<StreamUpdate>({ status: "idle", message: "" })
    const [streamLogs, setStreamLogs] = useState<LogItem[]>([])

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
                (update: StreamUpdate) => {
                    // Real-time update handler
                    if (update.status && update.status !== "complete") {
                        setStreamStatus({
                            status: update.status,
                            message: update.message || update.status
                        })

                        // Add significant updates to log
                        if (update.score || update.feedback || update.message) {
                            setStreamLogs(prev => [...prev, {
                                message: update.message || update.status,
                                data: update,
                                score: !!update.score
                            }])
                        }
                    }
                }
            )

            setResult({
                final_score: generationResult.final_score || analysisResult.score,
                latex_code: generationResult.latex_code,
                execution_log: generationResult.execution_log
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
