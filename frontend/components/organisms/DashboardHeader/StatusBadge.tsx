
import { Sparkles } from "lucide-react"

export function StatusBadge() {
    return (
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
    )
}
