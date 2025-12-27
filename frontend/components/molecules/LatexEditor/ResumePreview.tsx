
import { useState, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/atoms/Button"

interface ResumePreviewProps {
    code: string
}

export function ResumePreview({ code }: ResumePreviewProps) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const compilePdf = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch("/api/compile-latex", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code })
                })

                if (!response.ok) {
                    let errMessage = "Compilation failed";
                    try {
                        const errData = await response.json();
                        errMessage = errData.log || errData.error || errData.details || errMessage;
                    } catch (e) {
                        // Fallback to text if JSON parsing fails
                        const text = await response.text();
                        if (text) errMessage = text;
                    }
                    throw new Error(errMessage);
                }

                const data = await response.json()

                if (data.status === "success" && data.url) {
                    setPdfUrl(data.url)
                } else if (data.status === "error") {
                    throw new Error(data.log || "Compilation error")
                }
            } catch (err) {
                console.error(err)
                setError("Failed to generate PDF preview. Please download the LaTeX and compile locally.")
            } finally {
                setLoading(false)
            }
        }

        const timer = setTimeout(() => {
            compilePdf()
        }, 1000) // Debounce

        return () => clearTimeout(timer)
    }, [code])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                <Loader2 className="animate-spin" size={32} />
                <p>Compiling Preview...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-400 gap-3 p-6 text-center">
                <AlertCircle size={32} />
                <p>{error}</p>
                <Button variant="outline" onClick={() => {
                    const base64 = btoa(unescape(encodeURIComponent(code)));
                    window.open(`https://www.overleaf.com/docs?snip_uri=${encodeURIComponent("data:application/x-tex;base64," + base64)}`, "_blank")
                }}>
                    Open in Overleaf
                </Button>
            </div>
        )
    }

    return (
        <div className="h-full w-full bg-white rounded-lg overflow-hidden">
            {pdfUrl && (
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-none"
                    title="Resume Preview"
                />
            )}
        </div>
    )
}
