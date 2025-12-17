"use client"

import { Card } from "@/components/atoms/Card"
import { motion } from "framer-motion"

const RESUME_TEMPLATES = [
    {
        id: 1,
        title: "Modern Professional",
        color: "bg-blue-500/20",
        accent: "border-blue-500/50"
    },
    {
        id: 2,
        title: "Creative Designer",
        color: "bg-purple-500/20",
        accent: "border-purple-500/50"
    },
    {
        id: 3,
        title: "Executive Minimal",
        color: "bg-emerald-500/20",
        accent: "border-emerald-500/50"
    },
    {
        id: 4,
        title: "Tech Focused",
        color: "bg-orange-500/20",
        accent: "border-orange-500/50"
    }
]

export function ResumeGallery() {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Example Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {RESUME_TEMPLATES.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative aspect-[3/4] cursor-pointer"
                    >
                        <Card className={`h-full w-full overflow-hidden border-2 ${template.accent} ${template.color} transition-all duration-300 md:group-hover:scale-105 group-hover:shadow-xl`}>
                            {/* Abstract Resume Layout Visualization */}
                            <div className="p-3 space-y-2 opacity-50">
                                <div className="h-2 w-1/3 bg-current rounded-full mb-4" />
                                <div className="space-y-1">
                                    <div className="h-1 w-full bg-current rounded-full" />
                                    <div className="h-1 w-5/6 bg-current rounded-full" />
                                    <div className="h-1 w-4/6 bg-current rounded-full" />
                                </div>
                                <div className="pt-2 space-y-1">
                                    <div className="h-1 w-1/4 bg-current rounded-full" />
                                    <div className="h-1 w-full bg-current rounded-full" />
                                    <div className="h-1 w-full bg-current rounded-full" />
                                </div>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-medium text-white px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
                                    Preview
                                </span>
                            </div>
                        </Card>
                        <p className="mt-2 text-xs font-medium text-center text-muted-foreground">{template.title}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
