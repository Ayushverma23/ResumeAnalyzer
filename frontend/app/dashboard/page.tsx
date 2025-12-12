"use client"

import * as React from "react"
import { Bot, FileText, ArrowRight, Activity, Zap } from "lucide-react"
import { Button } from "@/components/atoms/Button"
import { Card } from "@/components/atoms/Card"
import { UploadZone } from "@/components/molecules/UploadZone"
import { ModelSelector } from "@/components/molecules/ModelSelector"
import { LatexEditor } from "@/components/molecules/LatexEditor"

export default function Dashboard() {
    const [step, setStep] = React.useState<1 | 2 | 3>(1)
    const [file, setFile] = React.useState<File | null>(null)
    const [jobDescription, setJobDescription] = React.useState("")
    const [selectedModel, setSelectedModel] = React.useState("gemini")
    const [isAnalyzing, setIsAnalyzing] = React.useState(false)
    const [result, setResult] = React.useState<any>(null)

    // Mock Analysis for visual testing (Real integration in Step 18)
    const handleAnalyze = async () => {
        if (!file || !jobDescription) return

        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setStep(2)
            setResult({
                score: 78,
                summary: "Good match but missing Cloud keywords.",
                generated_latex: "% This is a mock LaTeX resume.\n\\documentclass{article}\n\\begin{document}\nHello World\n\\end{document}"
            })
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-sans relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                            <Bot size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Agentic<span className="text-primary">Resume</span></h1>
                            <p className="text-xs text-muted-foreground">AI-Powered Optimization</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs text-muted-foreground">
                            <Activity size={14} className="text-green-500" />
                            <span>System Online</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Inputs */}
                    <div className="lg:col-span-5 space-y-6">
                        <section>
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs">1</span>
                                Resume & Job
                            </h2>
                            <Card className="p-6 space-y-6 bg-black/40 border-white/5">
                                <UploadZone
                                    selectedFile={file}
                                    onFileSelect={setFile}
                                />

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Job Description (JD)</label>
                                    <textarea
                                        className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none mb-2"
                                        placeholder="Paste the Job Description here..."
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                </div>
                            </Card>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs">2</span>
                                Select Agent Model
                            </h2>
                            <ModelSelector
                                selectedModel={selectedModel}
                                onSelect={setSelectedModel}
                            />
                        </section>

                        <Button
                            size="lg"
                            className="w-full text-base font-semibold shadow-xl shadow-primary/20"
                            disabled={!file || !jobDescription || isAnalyzing}
                            onClick={handleAnalyze}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Zap className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                                </>
                            ) : (
                                <>
                                    Run Analysis Agent <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Right Panel: Results */}
                    <div className="lg:col-span-7 h-[85vh] sticky top-6">
                        {step === 1 && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-2xl bg-white/5">
                                <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                                    <FileText size={48} className="text-primary/40" />
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-2">Ready to Optimize</h3>
                                <p className="text-muted-foreground max-w-sm">
                                    Upload your resume and paste a job description to let our AI Agents analyze gaps and rewrite your resume in LaTeX.
                                </p>
                            </div>
                        )}

                        {step === 2 && result && (
                            <div className="h-full flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="p-4 bg-green-500/10 border-green-500/20">
                                        <div className="text-sm text-green-400 mb-1">Match Score</div>
                                        <div className="text-3xl font-bold text-green-400">{result.score}%</div>
                                    </Card>
                                    <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                                        <div className="text-sm text-blue-400 mb-1">Status</div>
                                        <div className="text-sm font-medium text-blue-400">Optimization Complete</div>
                                    </Card>
                                </div>

                                <div className="flex-1 min-h-0">
                                    <LatexEditor code={result.generated_latex} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
