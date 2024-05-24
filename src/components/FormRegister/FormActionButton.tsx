import { ButtonHTMLAttributes } from "react";

interface FormActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function FormActionButton({
  text,
  ...rest
}: FormActionButtonProps) {
  return (
    <button
      {...rest}
      className="w-80 bg-blue-600 rounded mt-10 mb-12 md:mb-1 pr-5 pl-5 pt-3 pb-3 font-semibold text-lg text-white"
    >
      {text}
    </button>
  );
}