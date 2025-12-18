
import { UploadZone } from "@/components/molecules/UploadZone"
import { JobDescriptionInput } from "@/components/molecules/JobDescriptionInput"

interface ContextSectionProps {
    file: File | null
    setFile: (file: File | null) => void
    jd: string
    setJd: (jd: string) => void
}

export function ContextSection({ file, setFile, jd, setJd }: ContextSectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/20 text-sm font-bold shadow-[0_0_15px_rgba(124,58,237,0.2)]">1</div>
                <h2 className="text-xl font-semibold tracking-tight">Context & Source</h2>
            </div>
            <div className="glass-card rounded-xl p-6 space-y-8 relative overflow-hidden group">
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
    )
}
