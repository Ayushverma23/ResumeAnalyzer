
import { Cpu, Zap, Box, LucideIcon } from "lucide-react"

export interface ModelOption {
    id: string
    name: string
    icon: LucideIcon
    desc: string
}

export const MODELS: ModelOption[] = [
    { id: "gemini", name: "Gemini 1.5", icon: Zap, desc: "Fast & Balanced" },
    { id: "groq", name: "Groq Llama 3", icon: Cpu, desc: "Ultra Speed" },
    { id: "hf", name: "HuggingFace", icon: Box, desc: "Open Source" },
]

export interface ModelSelectorProps {
    selectedModel: string
    onSelect: (model: string) => void
}
