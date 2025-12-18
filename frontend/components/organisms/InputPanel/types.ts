
import { StreamUpdate, LogItem } from "@/types"

export interface InputPanelProps {
    file: File | null
    setFile: (file: File | null) => void
    jd: string
    setJd: (jd: string) => void
    model: string
    setModel: (model: string) => void
    isAnalyzing: boolean
    streamStatus?: StreamUpdate
    streamLogs?: LogItem[]
    onAnalyze: () => void
}
