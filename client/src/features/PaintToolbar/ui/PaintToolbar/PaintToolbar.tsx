import { PaintToolbarSettings } from "../PaintToolbarSettings/PaintToolbarSettings";
import { PaintToolbarTools } from "../PaintToolbarTools/PaintToolbarTools";

export interface PaintToolbarProps {
  className?: string;
}

export const PaintToolbar = ({ className }: PaintToolbarProps) => {
  return (
    <div className={className}>
      <PaintToolbarTools />
      <PaintToolbarSettings />
    </div>
  );
};
