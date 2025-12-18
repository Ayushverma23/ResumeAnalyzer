
import { AgentThinkingProps } from "./types"
import { StatusIcon } from "./StatusIcon"
import { LogStream } from "./LogStream"

export function AgentThinking({ status, message, logs }: AgentThinkingProps) {
    return (
        <div className="w-full glass-card p-6 rounded-xl space-y-4 border-l-4 border-l-primary/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-xl" />

            <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                    <StatusIcon status={status} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                        Agent Working
                        <span className="flex gap-1">
                            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1 h-1 bg-current rounded-full animate-bounce"></span>
                        </span>
                    </h3>
                    <p className="text-primary font-medium animate-pulse">{message}</p>
                </div>
            </div>

            <LogStream logs={logs} />
        </div>
    )
}
