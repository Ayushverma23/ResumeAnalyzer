
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: "No LaTeX code provided" }, { status: 400 });
        }

        const response = await fetch("https://rtex.probablyvoid.com/api/v2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                format: "pdf"
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Rtex external error:", response.status, errorText);
            return NextResponse.json({ error: "Compilation Service Error", details: errorText }, { status: response.status });
        }

        const data = await response.json();

        if (data.status === "success") {
            // If success, we return the download URL
            // Ensure the download URL is absolute
            const downloadUrl = data.download_url.startsWith("http")
                ? data.download_url
                : `https://rtex.probablyvoid.com/api/v2/${data.filename}`;

            return NextResponse.json({ status: "success", url: downloadUrl });
        } else if (data.status === "error") {
            return NextResponse.json({ status: "error", log: data.log }, { status: 400 });
        } else {
            return NextResponse.json(data);
        }

    } catch (error) {
        console.error("Compilation proxy error:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Internal Server Error",
            details: String(error)
        }, { status: 500 });
    }
}
