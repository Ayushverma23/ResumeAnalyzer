
interface EditorViewProps {
    code: string
}

export function EditorView({ code }: EditorViewProps) {
    return (
        <div className="relative flex-1 overflow-auto group">
            <pre className="p-4 text-sm font-mono text-blue-100/80 leading-relaxed selection:bg-primary/30">
                <code>{code}</code>
            </pre>
        </div>
    )
}
