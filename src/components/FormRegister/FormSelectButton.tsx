import { SelectHTMLAttributes } from "react";

interface FormSelectButtonProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const FormSelectButton: React.FC<FormSelectButtonProps> = ({
  options,
  ...rest
}) => {
  return (
    <select
      {...rest}
      className="w-full border border-zinc-400 rounded mt-2 mb-1 pr-2 pl-2 pt-2 pb-2 text-gray-500 bg-white appearance-none h-11"
    >
      <option value="" className="text-gray-400" disabled hidden>
        Selecione uma opção
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelectButton;
