import { Button } from "@/shared/ui/Button";
import { ButtonHTMLAttributes } from "react";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  Svg: Svg;
  title: string;
}

export const IconButton = ({ Svg, title, ...props }: IconButtonProps) => {
  return (
    <Button variant="clear" title={title} className="size-12" {...props}>
      <Svg className="size-6" />
    </Button>
  );
};
