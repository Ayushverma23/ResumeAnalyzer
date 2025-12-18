
import { motion } from "framer-motion"

interface LogItemProps {
    message: string
    isScore?: boolean
}

export function LogItem({ message, isScore }: LogItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2"
        >
            <span className="text-muted-foreground">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
            <span className={isScore ? "text-yellow-400" : "text-blue-300"}>
                {message}
            </span>
        </motion.div>
    )
}
