
import { Brain, FileEdit, Target, Sparkles, CheckCircle2 } from "lucide-react"

interface StatusIconProps {
    status: string
}

export function StatusIcon({ status }: StatusIconProps) {
    switch (status) {
        case "analyzing": return <Brain className="text-purple-400 animate-pulse" size={32} />
        case "drafting": return <FileEdit className="text-blue-400 animate-bounce" size={32} />
        case "scoring": return <Target className="text-orange-400 animate-pulse" size={32} />
        case "refining": return <Sparkles className="text-yellow-400 animate-spin-slow" size={32} />
        case "complete": return <CheckCircle2 className="text-green-400" size={32} />
        default: return <Brain className="text-muted-foreground" size={32} />
    }
}
