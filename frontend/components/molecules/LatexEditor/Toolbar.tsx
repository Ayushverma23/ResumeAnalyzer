
import { Button } from "@/components/atoms/Button"
import { Copy, Download, Check } from "lucide-react"

interface ToolbarProps {
    copied: boolean
    onCopy: () => void
    onDownload: () => void
    activeTab: 'code' | 'preview'
    onTabChange: (tab: 'code' | 'preview') => void
}

export function Toolbar({ copied, onCopy, onDownload, activeTab, onTabChange }: ToolbarProps) {
    return (
        <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>

                <div className="flex p-0.5 rounded-lg bg-black/20 border border-white/5">
                    <button
                        onClick={() => onTabChange('code')}
                        className={`text-xs px-3 py-1 rounded-md transition-all ${activeTab === 'code'
                                ? 'bg-primary/20 text-primary font-medium'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Code
                    </button>
                    <button
                        onClick={() => onTabChange('preview')}
                        className={`text-xs px-3 py-1 rounded-md transition-all ${activeTab === 'preview'
                                ? 'bg-primary/20 text-primary font-medium'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Preview
                    </button>
                </div>
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
