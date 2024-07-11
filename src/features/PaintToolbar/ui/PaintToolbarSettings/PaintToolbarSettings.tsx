import { Input } from "@/shared/ui/Input";
import { Toolbar } from "@/shared/ui/Toolbar";
import { usePaintToolbarStore } from "../../model/paint-toolbar-store";
import clsx from "clsx";

export interface PaintToolbarSettingsProps {
  className?: string;
}

export const PaintToolbarSettings = ({
  className,
}: PaintToolbarSettingsProps) => {
  const setLineWidth = usePaintToolbarStore((store) => store.setLineWidth);
  const setStrokeColor = usePaintToolbarStore((store) => store.setStrokeColor);
  const setFillColor = usePaintToolbarStore((store) => store.setFillColor);

  return (
    <Toolbar className={clsx("flex gap-3", className)}>
      <Input
        label="Line width: "
        className="border-black border-2"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
        onChange={(e) => setLineWidth(Number(e.target.value))}
      />
      <Input
        label="Stroke color: "
        type="color"
        className="bg-transparent size-8 cursor-pointer"
        onChange={(e) => setStrokeColor(e.target.value)}
      />
      <Input
        label="Fill color: "
        type="color"
        className="bg-transparent size-8 cursor-pointer"
        onChange={(e) => setFillColor(e.target.value)}
      />
    </Toolbar>
  );
};
