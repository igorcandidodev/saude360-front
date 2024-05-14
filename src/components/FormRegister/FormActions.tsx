import { ReactNode } from "react";

interface FormActionsProps {
    children : ReactNode
}

export function FormActions({ children } : FormActionsProps) {
    return (
        <div>
            {children}
        </div>
    )
}