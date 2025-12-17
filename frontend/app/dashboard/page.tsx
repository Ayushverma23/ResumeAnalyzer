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
        streamStatus,
        streamLogs,
        result,
        handleAnalyze
    } = useResumeAnalysis()

    return (
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-12 font-sans relative overflow-x-hidden selection:bg-primary/30">
            {/* Ambient Background - Enhanced */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full sm:opacity-50 opacity-30" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full sm:opacity-50 opacity-30" />
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-500/5 blur-[120px] rounded-full opacity-30 animate-pulse duration-[10000ms]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <DashboardHeader />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
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
                </div>
            </div>
        </div>
    )
}
