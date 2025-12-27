
import { useState, useEffect } from "react"
import { Card } from "@/components/atoms/Card"
import { Toolbar } from "./Toolbar"
import { EditorView } from "./EditorView"
import { ResumePreview } from "./ResumePreview"

interface LatexEditorProps {
    code: string
}

export function LatexEditor({ code }: LatexEditorProps) {
    const [localCode, setLocalCode] = useState(code)
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setLocalCode(code)
    }, [code])

    const handleCopy = () => {
        navigator.clipboard.writeText(localCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        const blob = new Blob([localCode], { type: "application/x-tex" })
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
            <Toolbar
                copied={copied}
                onCopy={handleCopy}
                onDownload={handleDownload}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            {activeTab === 'code' ? (
                <EditorView code={localCode} onChange={setLocalCode} />
            ) : (
                <ResumePreview code={localCode} />
            )}
        </Card>
    )
}
