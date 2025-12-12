import { Bot, Activity } from "lucide-react"

export function DashboardHeader() {
    return (
        <header className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <Bot size={28} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Agentic<span className="text-primary">Resume</span>
                    </h1>
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
    )
}
