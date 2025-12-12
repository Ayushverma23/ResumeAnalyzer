"use client"

import { Cpu, Zap, Box } from "lucide-react"
import { Button } from "../atoms/Button"
import { Card } from "../atoms/Card"
import { cn } from "@/lib/utils"

interface ModelSelectorProps {
    selectedModel: string
    onSelect: (model: string) => void
}

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
    const models = [
        { id: "gemini", name: "Gemini 1.5", icon: Zap, desc: "Fast & Balanced" },
        { id: "groq", name: "Groq Llama 3", icon: Cpu, desc: "Ultra Speed" },
        { id: "hf", name: "HuggingFace", icon: Box, desc: "Open Source" },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((model) => {
                const Icon = model.icon
                const isSelected = selectedModel === model.id

                return (
                    <Card
                        key={model.id}
                        className={cn(
                            "p-4 cursor-pointer transition-all duration-300 hover:bg-white/5 border-white/10 group relative overflow-hidden",
                            isSelected ? "border-primary bg-primary/10 shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]" : ""
                        )}
                        onClick={() => onSelect(model.id)}
                    >
                        <div className="flex items-center gap-3 relative z-10">
                            <div className={cn(
                                "p-2 rounded-lg transition-colors",
                                isSelected ? "bg-primary text-white" : "bg-white/10 text-muted-foreground group-hover:text-white"
                            )}>
                                <Icon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className={cn(
                                    "font-medium text-sm transition-colors",
                                    isSelected ? "text-white" : "text-muted-foreground group-hover:text-white"
                                )}>
                                    {model.name}
                                </span>
                                <span className="text-xs text-muted-foreground/60">
                                    {model.desc}
                                </span>
                            </div>
                        </div>
                        {/* Glow Effect */}
                        {isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />
                        )}
                    </Card>
                )
            })}
        </div>
    )
}
