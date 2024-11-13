import React from 'react';

interface FormItemProps {
  label: string;
  children: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({ label, children }) => (
  <div className="flex flex-col pt-6">
    <label className="pb-2" htmlFor={label.toLowerCase().replace(/\s/g, '-')}>
      {label}
    </label>
    {children}
  </div>
);

export default FormItem;