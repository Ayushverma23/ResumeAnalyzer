import { useState } from "react"
import { APIService } from "@/services/api"

export const useResumeAnalysis = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [file, setFile] = useState<File | null>(null)
    const [jobDescription, setJobDescription] = useState("")
    const [selectedModel, setSelectedModel] = useState("gemini")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleAnalyze = async () => {
        if (!file || !jobDescription) return

        setIsAnalyzing(true)
        try {
            const analysisResult = await APIService.analyzeResume(file, jobDescription, selectedModel)
            const generationResult = await APIService.generateResume(
                analysisResult.raw_text,
                jobDescription,
                analysisResult,
                selectedModel
            )

            setResult({
                score: generationResult.final_score || analysisResult.score,
                summary: analysisResult.summary,
                generated_latex: generationResult.latex_code,
                logs: generationResult.execution_log // Optional: Store logs if we want to show them
            })
            setStep(2)
        } catch (error) {
            alert("Error: " + (error as Error).message)
        } finally {
            setIsAnalyzing(false)
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
        result,
        handleAnalyze
    }
}
