
import { motion } from "framer-motion"
import { InputPanelProps } from "./types"
import { ContextSection } from "./ContextSection"
import { ConfigSection } from "./ConfigSection"
import { ActionSection } from "./ActionSection"

export function InputPanel(props: InputPanelProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
        >
            <ContextSection
                file={props.file} setFile={props.setFile}
                jd={props.jd} setJd={props.setJd}
            />

            <ConfigSection
                model={props.model} setModel={props.setModel}
            />

            <ActionSection
                isAnalyzing={props.isAnalyzing}
                disabled={!props.file || !props.jd || props.isAnalyzing}
                onAnalyze={props.onAnalyze}
                streamStatus={props.streamStatus}
                streamLogs={props.streamLogs}
            />
        </motion.div>
    )
}
