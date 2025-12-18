
import { Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/atoms/Button"

interface AnalyzeButtonProps {
    isLoading: boolean
    disabled: boolean
    onClick: () => void
}

export function AnalyzeButton({ isLoading, disabled, onClick }: AnalyzeButtonProps) {
    return (
        <Button
            size="lg"
            className="w-full text-base font-semibold shadow-xl shadow-primary/20"
            disabled={disabled}
            onClick={onClick}
        >
            {isLoading ? (
                <> <Zap className="mr-2 h-4 w-4 animate-spin" /> Analyzing... </>
            ) : (
                <> Run Analysis Agent <ArrowRight className="ml-2 h-4 w-4" /> </>
            )}
        </Button>
    )
}
