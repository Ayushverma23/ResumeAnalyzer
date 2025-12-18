
import { Card } from "@/components/atoms/Card"
import { motion } from "framer-motion"

interface GalleryItemProps {
    template: { id: number; title: string; color: string; accent: string }
    index: number
}

export function GalleryItem({ template, index }: GalleryItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
            className="group relative aspect-[3/4] cursor-pointer"
        >
            <Card className={`h-full w-full overflow-hidden border-2 ${template.accent} ${template.color} transition-all duration-300 md:group-hover:scale-105 group-hover:shadow-xl`}>
                <div className="p-3 space-y-2 opacity-50">
                    <div className="h-2 w-1/3 bg-current rounded-full mb-4" />
                    <div className="space-y-1"><div className="h-1 w-full bg-current rounded-full" /><div className="h-1 w-5/6 bg-current rounded-full" /><div className="h-1 w-4/6 bg-current rounded-full" /></div>
                </div>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium text-white px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">Preview</span>
                </div>
            </Card>
            <p className="mt-2 text-xs font-medium text-center text-muted-foreground">{template.title}</p>
        </motion.div>
    )
}
