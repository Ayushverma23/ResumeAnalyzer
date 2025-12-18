
import { Bot } from "lucide-react"

export function Logo() {
    return (
        <div className="flex items-center gap-4">
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/20 text-primary shadow-inner">
                    <Bot size={32} />
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
                    Agentic<span className="text-primary">Resume</span>
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                    AI-Powered Career Optimization
                    <span className="inline-block w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-xs font-mono text-primary/80">v2.0</span>
                </p>
            </div>
        </div>
    )
}
