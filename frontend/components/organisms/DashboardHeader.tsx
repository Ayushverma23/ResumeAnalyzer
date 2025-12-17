import { Bot, Activity, Sparkles } from "lucide-react"

export function DashboardHeader() {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in-fade">
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

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0A0A0F]/50 rounded-full border border-white/10 text-xs font-medium text-muted-foreground backdrop-blur-md shadow-lg">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-green-500/90 font-semibold">System Online</span>
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-xs text-primary font-medium">
                    <Sparkles size={12} />
                    <span>Premium Enabled</span>
                </div>
            </div>
        </header>
    )
}
