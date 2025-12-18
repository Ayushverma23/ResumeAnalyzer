
import * as React from "react"
import { cn } from "@/lib/utils"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function Title({ className, level = 1, ...props }: TitleProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return (
        <Tag
            className={cn(
                "font-semibold tracking-tight text-foreground",
                {
                    "text-4xl": level === 1,
                    "text-3xl": level === 2,
                    "text-2xl": level === 3,
                    "text-xl": level === 4,
                },
                className
            )}
            {...props}
        />
    )
}
