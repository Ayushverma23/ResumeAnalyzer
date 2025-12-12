"use client"

import * as React from "react"
import { Copy, Download, Check } from "lucide-react"
import { Button } from "../atoms/Button"
import { Card } from "../atoms/Card"

interface LatexEditorProps {
    code: string
}

export function LatexEditor({ code }: LatexEditorProps) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const blob = new Blob([code], { type: "application/x-tex" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "optimized_resume.tex"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <Card className="flex flex-col h-full overflow-hidden border-white/10 bg-black/40">
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-xs font-mono text-muted-foreground">resume.tex</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs gap-1.5"
                        onClick={handleCopy}
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button
                        size="sm"
                        variant="default"
                        className="h-7 text-xs gap-1.5"
                        onClick={handleDownload}
                    >
                        <Download size={14} />
                        Download .tex
                    </Button>
                </div>
            </div>
            <div className="relative flex-1 overflow-auto group">
                <pre className="p-4 text-sm font-mono text-blue-100/80 leading-relaxed selection:bg-primary/30">
                    <code>{code}</code>
                </pre>
            </div>
        </Card>
    )
}
