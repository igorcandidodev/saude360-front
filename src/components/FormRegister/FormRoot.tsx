import { ReactNode } from "react"

interface FormRootProps {
    children : ReactNode
}

export default function FormRoot({children} : FormRootProps) {
    return (
        <div className="w-90 flex flex-col items-center justify-center">
            {children}
        </div>
    )
}
