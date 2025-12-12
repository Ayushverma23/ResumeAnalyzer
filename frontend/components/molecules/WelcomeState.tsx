import { FileText } from "lucide-react"

export function WelcomeState() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-2xl bg-white/5">
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <FileText size={48} className="text-primary/40" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
                Ready to Optimize
            </h3>
            <p className="text-muted-foreground max-w-sm">
                Upload your resume and paste a job description to let our AI Agents analyze gaps and rewrite your resume in LaTeX.
            </p>
        </div>
    )
}
