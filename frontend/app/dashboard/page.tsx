"use client"

import { useResumeAnalysis } from "@/hooks/useResumeAnalysis"
import { DashboardHeader } from "@/components/organisms/DashboardHeader"
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
        result,
        handleAnalyze
    } = useResumeAnalysis()

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <DashboardHeader />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <InputPanel
                        file={file}
                        setFile={setFile}
                        jd={jobDescription}
                        setJd={setJobDescription}
                        model={selectedModel}
                        setModel={setSelectedModel}
                        isAnalyzing={isAnalyzing}
                        onAnalyze={handleAnalyze}
                    />
                    <OutputPanel step={step} result={result} />
                </div>
            </div>
        </div>
    )
}
