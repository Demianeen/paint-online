import clsx from "clsx";

export interface ToolbarProps {
  className?: string;
  children?: React.ReactNode;
}

export const Toolbar = ({ className, children }: ToolbarProps) => {
  return (
    <div
      className={clsx(
        "h-toolbar bg-white sticky w-full shadow-md top-0 p-3",
        className,
      )}
    >
      {children}
    </div>
  );
};
