
import { ModelSelector } from "@/components/molecules/ModelSelector"

interface ConfigSectionProps {
    model: string
    setModel: (model: string) => void
}

export function ConfigSection({ model, setModel }: ConfigSectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20 text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">2</div>
                <h2 className="text-xl font-semibold tracking-tight">Configuration</h2>
            </div>
            <div className="glass-card rounded-xl p-6">
                <ModelSelector selectedModel={model} onSelect={setModel} />
            </div>
        </section>
    )
}
