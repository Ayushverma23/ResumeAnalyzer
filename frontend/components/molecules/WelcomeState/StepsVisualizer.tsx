
export function StepsVisualizer() {
    return (
        <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-8">
            {[
                { step: "1", label: "Upload" },
                { step: "2", label: "Analyze" },
                { step: "3", label: "Export" }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-semibold group-hover:border-primary/50 group-hover:bg-primary/20 transition-colors">
                        {item.step}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</span>
                </div>
            ))}
        </div>
    )
}
