
import { Button } from "@/components/atoms/Button"
import { Copy, Download, Check } from "lucide-react"

interface ToolbarProps {
    copied: boolean
    onCopy: () => void
    onDownload: () => void
}

export function Toolbar({ copied, onCopy, onDownload }: ToolbarProps) {
    return (
        <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">resume.tex</span>
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-7 text-xs gap-1.5" onClick={onCopy}>
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                </Button>
                <Button size="sm" variant="default" className="h-7 text-xs gap-1.5" onClick={onDownload}>
                    <Download size={14} />
                    Download .tex
                </Button>
            </div>
        </div>
    )
}
