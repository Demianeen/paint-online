import clsx from "clsx";

export interface PageProps {
  className?: string;
  children?: React.ReactNode;
}

export const Page = ({ className, children }: PageProps) => {
  return <main className={clsx("bg-bg h-screen", className)}>{children}</main>;
};
