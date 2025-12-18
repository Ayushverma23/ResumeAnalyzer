
import { DashboardHeader } from "@/components/organisms/DashboardHeader"

interface DashboardTemplateProps {
    children: React.ReactNode
}

export function DashboardTemplate({ children }: DashboardTemplateProps) {
    return (
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-12 font-sans relative overflow-x-hidden selection:bg-primary/30">
            {/* Ambient Background */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full sm:opacity-50 opacity-30" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full sm:opacity-50 opacity-30" />
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-500/5 blur-[120px] rounded-full opacity-30 animate-pulse duration-[10000ms]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <DashboardHeader />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {children}
                </div>
            </div>
        </div>
    )
}
