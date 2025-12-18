
import { Logo } from "./Logo"
import { StatusBadge } from "./StatusBadge"

export function DashboardHeader() {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in-fade">
            <Logo />
            <StatusBadge />
        </header>
    )
}
