"use client"

import * as React from "react"
import { UploadCloud, FileText, CheckCircle, X } from "lucide-react"
import { Card } from "../atoms/Card"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
    onFileSelect: (file: File | null) => void
    selectedFile: File | null
}

export function UploadZone({ onFileSelect, selectedFile }: UploadZoneProps) {
    const [isDragging, setIsDragging] = React.useState(false)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true)
        } else if (e.type === "dragleave") {
            setIsDragging(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type === "application/pdf") {
                onFileSelect(file)
            } else {
                alert("Please upload a PDF file.")
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0])
        }
    }

    return (
        <div className="w-full">
            {!selectedFile ? (
                <label
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group",
                        isDragging
                            ? "border-primary bg-primary/10"
                            : "border-white/10 hover:border-white/30 hover:bg-white/5"
                    )}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center z-10">
                        <div className={cn(
                            "p-4 rounded-full mb-3 transition-all duration-500",
                            isDragging ? "bg-primary text-white scale-110" : "bg-white/5 text-muted-foreground group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white"
                        )}>
                            <UploadCloud size={28} />
                        </div>
                        <p className="mb-2 text-sm text-foreground font-medium">
                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF (MAX. 5MB)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleChange}
                    />
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
                    </div>
                </label>
            ) : (
                <Card className="flex items-center justify-between p-4 border-primary/50 bg-primary/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                            <FileText size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">{selectedFile.name}</span>
                            <span className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onFileSelect(null);
                        }}
                        className="p-2 hover:bg-red-500/20 text-muted-foreground hover:text-red-500 rounded-full transition-colors"
                    >
                        <X size={18} />
                    </button>
                </Card>
            )}
        </div>
    )
}
