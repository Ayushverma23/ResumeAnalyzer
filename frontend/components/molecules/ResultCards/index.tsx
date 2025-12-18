
import { Card } from "@/components/atoms/Card"

interface ResultCardsProps {
    score: number
}

export function ResultCards({ score }: ResultCardsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-green-500/10 border-green-500/20">
                <div className="text-sm text-green-400 mb-1">Match Score</div>
                <div className="text-3xl font-bold text-green-400">{score}%</div>
            </Card>
            <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                <div className="text-sm text-blue-400 mb-1">Status</div>
                <div className="text-sm font-medium text-blue-400">
                    Optimization Complete
                </div>
            </Card>
        </div>
    )
}
