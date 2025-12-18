
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropAreaProps {
    isDragging: boolean
    onDrag: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function DropArea({ isDragging, onDrag, onDrop, onChange }: DropAreaProps) {
    return (
        <label
            onDragEnter={onDrag} onDragLeave={onDrag} onDragOver={onDrag} onDrop={onDrop}
            className={cn(
                "relative flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group",
                isDragging ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30 hover:bg-white/5"
            )}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center z-10">
                <div className={cn("p-4 rounded-full mb-3 transition-all duration-500", isDragging ? "bg-primary text-white scale-110" : "bg-white/5 text-muted-foreground group-hover:scale-110")}>
                    <UploadCloud size={28} />
                </div>
                <p className="mb-2 text-sm text-foreground font-medium">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PDF (MAX. 5MB)</p>
            </div>
            <input type="file" className="hidden" accept=".pdf" onChange={onChange} />
        </label>
    )
}
