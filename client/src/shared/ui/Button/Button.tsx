import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant: "clear";
}

export const Button = ({
  children,
  variant,
  className,
  ...props
}: ButtonProps) => {
  if (variant == "clear") {
    return (
      <button className={clsx("button-clear", className)} {...props}>
        {children}
      </button>
    );
  }
  throw new Error("Invalid button variant");
};
