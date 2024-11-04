import { ButtonHTMLAttributes } from "react";

interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string; // Propriedade opcional para o ícone
}

export default function ActionButton({
  text,
  icon,
  ...rest
}: ActionButtonProps) {
  return (
    <button
      {...rest}
      className="flex items-center w-auto bg-blue-600 rounded mt-10 mb-12 md:mb-1 px-8 py-2 font-semibold text-lg text-white whitespace-nowrap justify-center"
    >
      {icon && <img src={icon} alt="Icon" className="mr-2 w-6 h-6" onError={(e) => (e.currentTarget.style.display = "none")}/>}
      {text}
    </button>
  );
}
