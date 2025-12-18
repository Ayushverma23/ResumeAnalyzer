
import { useState } from "react"
import { Card } from "@/components/atoms/Card"
import { Toolbar } from "./Toolbar"
import { EditorView } from "./EditorView"

interface LatexEditorProps {
    code: string
}

export function LatexEditor({ code }: LatexEditorProps) {
    const [copied, setCopied] = useState(false)

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
            <Toolbar copied={copied} onCopy={handleCopy} onDownload={handleDownload} />
            <EditorView code={code} />
        </Card>
    )
}
