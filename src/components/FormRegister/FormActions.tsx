import { ReactNode } from "react";

interface FormActionsProps {
    children : ReactNode
}

export function FormActions({ children } : FormActionsProps) {
    return (
        <div className="md:mb-7">
            {children}
        </div>
    )
}