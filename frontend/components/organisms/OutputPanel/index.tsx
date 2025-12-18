
import { LatexEditor } from "@/components/molecules/LatexEditor"
import { WelcomeState } from "@/components/molecules/WelcomeState"
import { ResultCards } from "@/components/molecules/ResultCards"
import { OutputPanelProps } from "./types"

export function OutputPanel({ step, result }: OutputPanelProps) {
    return (
        <div className="lg:col-span-7 h-[85vh] sticky top-6">
            {step === 1 && <WelcomeState />}

            {step === 2 && result && (
                <div className="h-full flex flex-col gap-6">
                    <ResultCards score={result.final_score || 0} />

                    <div className="flex-1 min-h-0">
                        <LatexEditor code={result.latex_code} />
                    </div>
                </div>
            )}
        </div>
    )
}
