
import * as React from "react"
import { UploadZoneProps } from "./types"
import { useUpload } from "./useUpload"
import { DropArea } from "./DropArea"
import { FilePreview } from "./FilePreview"

export function UploadZone({ onFileSelect, selectedFile }: UploadZoneProps) {
    const { isDragging, handleDrag, handleDrop, handleChange } = useUpload(onFileSelect)

    return (
        <div className="w-full">
            {!selectedFile ? (
                <DropArea
                    isDragging={isDragging}
                    onDrag={handleDrag}
                    onDrop={handleDrop}
                    onChange={handleChange}
                />
            ) : (
                <FilePreview file={selectedFile} onRemove={() => onFileSelect(null)} />
            )}
        </div>
    )
}
