"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Brain, FileEdit, Target, Sparkles, CheckCircle2 } from "lucide-react"
import { useEffect, useRef } from "react"

interface AgentThinkingProps {
    status: string
    message: string
    logs: any[]
}

export function AgentThinking({ status, message, logs }: AgentThinkingProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs, message])

    const getIcon = () => {
        switch (status) {
            case "analyzing": return <Brain className="text-purple-400 animate-pulse" size={32} />
            case "drafting": return <FileEdit className="text-blue-400 animate-bounce" size={32} />
            case "scoring": return <Target className="text-red-400 animate-ping" size={32} />
            case "refining": return <Sparkles className="text-yellow-400 animate-spin-slow" size={32} />
            case "complete": return <CheckCircle2 className="text-green-400" size={32} />
            default: return <Brain className="text-muted-foreground" size={32} />
        }
    }

    return (
        <div className="w-full glass-card p-6 rounded-xl space-y-4 border-l-4 border-l-primary/50 relative overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-xl" />

            <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                    {getIcon()}
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

            {/* Terminal Log View */}
            <div
                ref={scrollRef}
                className="h-32 bg-black/80 rounded-lg p-3 font-mono text-xs overflow-y-auto custom-scrollbar border border-white/5 space-y-1 shadow-inner"
            >
                <div className="text-green-500/50"># Optimization Log initiated...</div>
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2"
                    >
                        <span className="text-muted-foreground">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                        <span className={log.score ? "text-yellow-400" : "text-blue-300"}>
                            {log.message || JSON.stringify(log.data || log)}
                        </span>
                    </motion.div>
                ))}
                {/* Simulated cursor */}
                <div className="animate-pulse text-primary font-bold">_</div>
            </div>
        </div>
    )
}
