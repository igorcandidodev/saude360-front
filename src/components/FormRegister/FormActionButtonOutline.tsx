import { ButtonHTMLAttributes } from "react";

interface FormActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function FormActionButtonOutline({
  text,
  ...rest
}: FormActionButtonProps) {
  return (
    <button
      {...rest}
      className="w-80 border border-blue-600 rounded mt-10 mb-3 pr-5 pl-5 pt-3 pb-3 font-semibold text-lg text-blue-600"
    >
      {text}
    </button>
  );
}
