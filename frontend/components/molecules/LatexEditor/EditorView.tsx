
interface EditorViewProps {
    code: string
    onChange: (newCode: string) => void
}

export function EditorView({ code, onChange }: EditorViewProps) {
    return (
        <div className="relative flex-1 h-full overflow-hidden group bg-[#0d1117]">
            <textarea
                value={code}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm leading-relaxed bg-transparent text-blue-100/80 resize-none focus:outline-none focus:ring-1 focus:ring-primary/20 selection:bg-primary/30"
                spellCheck={false}
            />
        </div>
    )
}
