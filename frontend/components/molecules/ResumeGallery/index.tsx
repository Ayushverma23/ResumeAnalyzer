
import { RESUME_TEMPLATES } from "./constants"
import { GalleryItem } from "./GalleryItem"

export function ResumeGallery() {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Example Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {RESUME_TEMPLATES.map((template, index) => (
                    <GalleryItem key={template.id} template={template} index={index} />
                ))}
            </div>
        </div>
    )
}
