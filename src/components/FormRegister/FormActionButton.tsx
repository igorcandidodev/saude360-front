interface FormActionButtonProps {
    text : string
}

export default function FormActionButton( {text} : FormActionButtonProps) {
  return (
    <button className="bg-blue-600 rounded mt-10 mb-12 pr-5 pl-5 pt-3 pb-3 w-full font-semibold text-lg text-white">
      {text}
    </button>
  );
}
