
"use client"

import { useResumeAnalysis } from "@/hooks/useResumeAnalysis"
import { DashboardTemplate } from "@/components/templates/DashboardTemplate"
import { InputPanel } from "@/components/organisms/InputPanel"
import { OutputPanel } from "@/components/organisms/OutputPanel"

export default function Dashboard() {
    const {
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
    } = useResumeAnalysis()

    return (
        <DashboardTemplate>
            <InputPanel
                file={file}
                setFile={setFile}
                jd={jobDescription}
                setJd={setJobDescription}
                model={selectedModel}
                setModel={setSelectedModel}
                isAnalyzing={isAnalyzing}
                streamStatus={streamStatus}
                streamLogs={streamLogs}
                onAnalyze={handleAnalyze}
            />
            <OutputPanel step={step} result={result} />
        </DashboardTemplate>
    )
}
