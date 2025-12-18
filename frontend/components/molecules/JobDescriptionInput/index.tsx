
interface JobDescriptionInputProps {
    value: string
    onChange: (value: string) => void
}

export function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
                Job Description (JD)
            </label>
            <textarea
                className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none mb-2"
                placeholder="Paste the Job Description here..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
