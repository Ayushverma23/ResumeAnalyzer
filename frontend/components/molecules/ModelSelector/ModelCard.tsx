
import { Card } from "@/components/atoms/Card"
import { cn } from "@/lib/utils"
import { ModelOption } from "./types"

interface ModelCardProps {
    model: ModelOption
    isSelected: boolean
    onSelect: (id: string) => void
}

export function ModelCard({ model, isSelected, onSelect }: ModelCardProps) {
    const Icon = model.icon
    return (
        <Card
            className={cn(
                "p-4 cursor-pointer transition-all duration-300 hover:bg-white/5 border-white/10 group relative overflow-hidden",
                isSelected ? "border-primary bg-primary/10 shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]" : ""
            )}
            onClick={() => onSelect(model.id)}
        >
            <div className="flex items-center gap-3 relative z-10">
                <div className={cn("p-2 rounded-lg transition-colors", isSelected ? "bg-primary text-white" : "bg-white/10 text-muted-foreground group-hover:text-white")}>
                    <Icon size={20} />
                </div>
                <div className="flex flex-col">
                    <span className={cn("font-medium text-sm transition-colors", isSelected ? "text-white" : "text-muted-foreground group-hover:text-white")}>{model.name}</span>
                    <span className="text-xs text-muted-foreground/60">{model.desc}</span>
                </div>
            </div>
            {isSelected && <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />}
        </Card>
    )
}
