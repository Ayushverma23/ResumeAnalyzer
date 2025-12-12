import Link from "next/link";
import { ArrowRight, Bot, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="p-1.5 bg-primary/20 rounded-lg text-primary">
            <Bot size={24} />
          </div>
          <span>Agentic<span className="text-primary">Resume</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#demo" className="hover:text-foreground transition-colors">Live Demo</a>
          <a href="https://github.com/Ayushverma23/ResumeAnalyzer" target="_blank" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
        <Link href="/dashboard">
          <Button variant="glass" size="sm">Launch App</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground mb-8 animate-fade-in-up">
          <Sparkles size={14} className="text-yellow-500" />
          <span>Powered by Gemini 1.5 & Llama 3</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Optimize your Resume with <br />
          <span className="text-primary">Autonomous AI Agents</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Stop guessing keywords. Our Multi-Agent System analyzes your resume against any job description and rewrites it in LaTeX to beat the ATS.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8 text-base shadow-2xl shadow-primary/25">
              Start Optimizing Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10">
            View Sample Output
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full text-left">
          {[
            { title: "Multi-Model AI", desc: "Switch between Gemini, Groq, and HuggingFace models dynamically." },
            { title: "Deep Analysis", desc: "Get specific scoring, missing keywords, and actionable feedback." },
            { title: "LaTeX Generation", desc: "Receive ready-to-compile .tex code for a professional look." },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl glass border-white/5 hover:border-primary/20 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle size={20} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-white/5">
        <p>© 2025 Agentic Resume AI. Built with Next.js & FastAPI.</p>
      </footer>
    </div>
  );
}
