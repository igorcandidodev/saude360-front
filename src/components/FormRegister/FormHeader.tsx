interface FormHeaderProps {
    text: string
}

export default function FormHeader({text} : FormHeaderProps) {
  return (
    <>
      <div className="w-80 flex flex-col">
        <h2 className="text-zinc-600 text-center text-xl font-semibold">
          {text}
        </h2>
        <hr className="mt-4" />
      </div>
    </>
  );
}
