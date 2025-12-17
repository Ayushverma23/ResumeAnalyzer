import { Card } from "@/components/atoms/Card"
import { UploadZone } from "@/components/molecules/UploadZone"
import { JobDescriptionInput } from "@/components/molecules/JobDescriptionInput"
import { ModelSelector } from "@/components/molecules/ModelSelector"
import { AnalyzeButton } from "@/components/molecules/AnalyzeButton"
import { AgentThinking } from "@/components/molecules/AgentThinking"
import { motion, AnimatePresence } from "framer-motion"

interface InputPanelProps {
    file: File | null
    setFile: (file: File | null) => void
    jd: string
    setJd: (jd: string) => void
    model: string
    setModel: (model: string) => void
    isAnalyzing: boolean
    streamStatus?: { status: string; message: string }
    streamLogs?: any[]
    onAnalyze: () => void
}

export function InputPanel({
    file,
    setFile,
    jd,
    setJd,
    model,
    setModel,
    isAnalyzing,
    streamStatus,
    streamLogs,
    onAnalyze
}: InputPanelProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
        >
            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/20 text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.2)]">1</div>
                    <h2 className="text-xl font-semibold tracking-tight">Context & Source</h2>
                </div>

                <div className="glass-card rounded-xl p-6 space-y-8 relative overflow-hidden group">
                    {/* Decorative gradient blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />

                    <div className="space-y-2 relative">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Upload Resume</label>
                        <UploadZone selectedFile={file} onFileSelect={setFile} />
                    </div>

                    <div className="space-y-2 relative">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Job Description</label>
                        <JobDescriptionInput value={jd} onChange={setJd} />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    {/* Number 2 */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20 text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">2</div>
                    <h2 className="text-xl font-semibold tracking-tight">Configuration</h2>
                </div>

                <div className="glass-card rounded-xl p-6">
                    <ModelSelector selectedModel={model} onSelect={setModel} />
                </div>
            </section>

            <div className="pt-2">
                <AnimatePresence mode="wait">
                    {isAnalyzing && streamStatus ? (
                        <motion.div
                            key="thinking"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <AgentThinking
                                status={streamStatus.status}
                                message={streamStatus.message}
                                logs={streamLogs || []}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <AnalyzeButton
                                isLoading={isAnalyzing}
                                disabled={!file || !jd || isAnalyzing}
                                onClick={onAnalyze}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
