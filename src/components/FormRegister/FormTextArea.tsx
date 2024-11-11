import React from 'react';

interface FormTextAreaProps {
  name: string;
  rows?: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ name, rows = 5, value, onChange }) => (
  <textarea
    className="w-full border border-zinc-400 p-2 rounded"
    id={name}
    name={name}
    rows={rows}
    value={value}
    onChange={onChange}
  />
);

export default FormTextArea;