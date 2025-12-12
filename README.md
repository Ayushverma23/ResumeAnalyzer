# Agentic Resume AI 🧠

An advanced, Atomic Agentic AI system that analyzes resumes against job descriptions and uses Generative AI (Gemini, Groq, HuggingFace) to rewrite them into optimized LaTeX formats.

## 🚀 Features

-   **Agentic Architecture**: Built using a modular, service-based Atomic design.
-   **Multi-Model Support**: Switch dynamically between **Gemini 1.5**, **Groq Llama 3**, and **HuggingFace** models.
-   **PDF Parsing**: robustly extracts text from PDF resumes.
-   **Deep Analysis**: specific scoring, keyword gap analysis, and weakness identification.
-   **LaTeX Generation**: Generates professional, compilable `.tex` resume code.
-   **Premium UI**: Dark-mode "Agentic" aesthetics with Glassmorphism, built with Next.js & Tailwind.

## 🏗 Architecture

The project follows a strict Monorepo structure with Atomic principles:

```
ResumeProject/
├── backend/                 # FastAPI (Python)
│   ├── src/
│   │   ├── api/             # HTTP Routes
│   │   ├── core/            # Config & Env
│   │   ├── models/          # Pydantic Schemas
│   │   ├── services/        # Business Logic
│   │   │   ├── ai/          # AI Providers (Gemini, Groq, HF)
│   │   │   └── resume/      # Parser, Analyzer, Generator
├── frontend/                # Next.js 14 (TypeScript)
│   ├── app/                 # App Router
│   ├── components/
│   │   ├── atoms/           # Basic UI (Button, Card, Input)
│   │   ├── molecules/       # Complex UI (ModelSelector, UploadZone)
│   └── services/            # API Client
```

## 🛠 Setup & Installation

### Prerequisites

-   Python 3.10+
-   Node.js 18+
-   API Keys for Gemini, Groq, or HuggingFace.

### 1. Backend Setup

```bash
# Install dependencies
pip install -r backend/requirements.txt
# (Manually installed packages listed below if requirements.txt is missing)
pip install fastapi uvicorn python-multipart google-generativeai pypdf python-dotenv groq huggingface_hub requests

# Configure Environment
# Create a .env file in backend/ with:
# GEMINI_API_KEY=...
# GROQ_API_KEY=...
# HF_TOKEN=...

# Run Server (FROM ROOT DIRECTORY)
python -m uvicorn backend.main:app --reload
```

Server will start at `http://localhost:8000`.

### 2. Frontend Setup

```bash
cd frontend
# Install dependencies
npm install

# Run Development Server
npm run dev
```

App will start at `http://localhost:3000/dashboard`.

## 📖 Usage

1.  Open the Dashboard.
2.  **Upload** your current Resume (PDF).
3.  **Paste** the Job Description (JD) you are applying for.
4.  **Select** your preferred AI Agent Model (Gemini, Groq, etc.).
5.  Click **Run Analysis Agent**.
6.  View your **Match Score** and feedback.
7.  Copy or Download the **Optimized LaTeX Code**.

## 🤝 Contributing

This project uses **Atomic Design**. Please ensure:
-   Each new component is an Atom, Molecule, or Organism.
-   Each new backend feature is a Service.

## 📄 License

MIT
