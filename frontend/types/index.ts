
export interface AnalysisResult {
    score: number;
    summary: string;
    missing_keywords: string[];
    strong_points: string[];
    weak_points: string[];
    raw_text: string;
}

export interface StreamUpdate {
    status: string;
    message?: string;
    score?: number;
    feedback?: string;
    payload?: GenerateResult;
}

export interface GenerateResult {
    latex_code: string;
    final_score?: number;
    execution_log?: any[];
}

export interface LogItem {
    message: string;
    data?: any;
    score?: boolean;
}
