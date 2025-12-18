
import { FileText, X } from "lucide-react"
import { Card } from "@/components/atoms/Card"

interface FilePreviewProps {
    file: File
    onRemove: () => void
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
    return (
        <Card className="flex items-center justify-between p-4 border-primary/50 bg-primary/5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                    <FileText size={24} />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                </div>
            </div>
            <button
                onClick={(e) => { e.preventDefault(); onRemove() }}
                className="p-2 hover:bg-red-500/20 text-muted-foreground hover:text-red-500 rounded-full transition-colors"
            >
                <X size={18} />
            </button>
        </Card>
    )
}
