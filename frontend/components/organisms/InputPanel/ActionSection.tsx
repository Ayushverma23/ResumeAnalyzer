
import { motion, AnimatePresence } from "framer-motion"
import { AnalyzeButton } from "@/components/molecules/AnalyzeButton"
import { AgentThinking } from "@/components/molecules/AgentThinking"
import { StreamUpdate, LogItem } from "@/types"

interface ActionSectionProps {
    isAnalyzing: boolean
    disabled: boolean
    onAnalyze: () => void
    streamStatus?: StreamUpdate
    streamLogs?: LogItem[]
}

export function ActionSection({ isAnalyzing, disabled, onAnalyze, streamStatus, streamLogs }: ActionSectionProps) {
    return (
        <div className="pt-2">
            <AnimatePresence mode="wait">
                {isAnalyzing && streamStatus ? (
                    <motion.div
                        key="thinking" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    >
                        <AgentThinking
                            status={streamStatus.status}
                            message={streamStatus.message || streamStatus.status}
                            logs={streamLogs || []}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <AnalyzeButton isLoading={isAnalyzing} disabled={disabled} onClick={onAnalyze} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
