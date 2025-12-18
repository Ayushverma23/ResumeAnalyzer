
import { useRef, useEffect } from "react"
import { LogItem as LogItemComponent } from "./LogItem"
import { LogItem } from "@/types"

interface LogStreamProps {
    logs: LogItem[]
}

export function LogStream({ logs }: LogStreamProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [logs])

    return (
        <div ref={scrollRef} className="h-32 bg-black/80 rounded-lg p-3 font-mono text-xs overflow-y-auto custom-scrollbar border border-white/5 space-y-1 shadow-inner">
            <div className="text-green-500/50"># Optimization Log initiated...</div>
            {logs.map((log, i) => (
                <LogItemComponent
                    key={i}
                    message={log.message || JSON.stringify(log.data || log)}
                    isScore={!!log.score}
                />
            ))}
            <div className="animate-pulse text-primary font-bold">_</div>
        </div>
    )
}
