import { InputHTMLAttributes, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  const inputId = useId();
  return (
    <span className="inline-flex items-center gap-2">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} {...props} />
    </span>
  );
};
