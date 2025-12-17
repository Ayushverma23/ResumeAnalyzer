import { motion } from "framer-motion"
import { ResumeGallery } from "./ResumeGallery"
import { Bot, Sparkles, FileText } from "lucide-react"

export function WelcomeState() {
    return (
        <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-8 min-h-[600px]">

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" />
                    <div className="relative w-24 h-24 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
                        <Bot size={48} className="text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-8 p-2 bg-[#0A0A0F] border border-white/10 rounded-lg shadow-xl"
                    >
                        <Sparkles size={16} className="text-yellow-400" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-2 -left-8 p-2 bg-[#0A0A0F] border border-white/10 rounded-lg shadow-xl"
                    >
                        <FileText size={16} className="text-blue-400" />
                    </motion.div>
                </motion.div>

                <div className="max-w-md space-y-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        <span className="text-gradient">Ready to Optimize?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Upload your resume and let our AI agent analyze, score, and rebuild it into a professional Latex format.
                    </p>
                </div>

                {/* Steps Visualization */}
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

                <div className="w-full max-w-4xl mt-12 pt-12 border-t border-white/5">
                    <ResumeGallery />
                </div>
            </div>
        </div>
    )
}
