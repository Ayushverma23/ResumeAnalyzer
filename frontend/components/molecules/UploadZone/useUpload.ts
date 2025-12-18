
import { useState, DragEvent, ChangeEvent } from "react"

export const useUpload = (onFileSelect: (file: File | null) => void) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleDrag = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true)
        } else if (e.type === "dragleave") {
            setIsDragging(false)
        }
    }

    const handleDrop = (e: DragEvent) => {
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0])
        }
    }

    return { isDragging, handleDrag, handleDrop, handleChange }
}
