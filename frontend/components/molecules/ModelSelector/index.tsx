
import { MODELS, ModelSelectorProps } from "./types"
import { ModelCard } from "./ModelCard"

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MODELS.map((model) => (
                <ModelCard
                    key={model.id}
                    model={model}
                    isSelected={selectedModel === model.id}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}
