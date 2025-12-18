
import { ResumeGallery } from "../ResumeGallery"
import { HeroSection } from "./HeroSection"
import { StepsVisualizer } from "./StepsVisualizer"

export function WelcomeState() {
    return (
        <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
            <HeroSection />
            <div className="flex flex-col items-center pb-8">
                <StepsVisualizer />
                <div className="w-full max-w-4xl mt-12 pt-12 border-t border-white/5">
                    <ResumeGallery />
                </div>
            </div>
        </div>
    )
}
