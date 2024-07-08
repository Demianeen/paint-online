import { Button } from "@/shared/ui/Button";

export interface IconButtonProps {
  Svg: Svg;
  title: string;
}

export const IconButton = ({ Svg, title }: IconButtonProps) => {
  return (
    <Button variant="clear" title={title} className="size-12">
      <Svg className="size-6" />
    </Button>
  );
};
