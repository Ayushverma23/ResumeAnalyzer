import { Card } from "@/components/atoms/Card"
import { UploadZone } from "@/components/molecules/UploadZone"
import { JobDescriptionInput } from "@/components/molecules/JobDescriptionInput"
import { ModelSelector } from "@/components/molecules/ModelSelector"
import { AnalyzeButton } from "@/components/molecules/AnalyzeButton"

interface InputPanelProps {
    file: File | null
    setFile: (f: File | null) => void
    jd: string
    setJd: (s: string) => void
    model: string
    setModel: (s: string) => void
    isAnalyzing: boolean
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
    onAnalyze
}: InputPanelProps) {
    return (
        <div className="lg:col-span-5 space-y-6">
            <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs">1</span>
                    Resume & Job
                </h2>
                <Card className="p-6 space-y-6 bg-black/40 border-white/5">
                    <UploadZone selectedFile={file} onFileSelect={setFile} />
                    <JobDescriptionInput value={jd} onChange={setJd} />
                </Card>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs">2</span>
                    Select Agent Model
                </h2>
                <ModelSelector selectedModel={model} onSelect={setModel} />
            </section>

            <AnalyzeButton
                isLoading={isAnalyzing}
                disabled={!file || !jd || isAnalyzing}
                onClick={onAnalyze}
            />
        </div>
    )
}
