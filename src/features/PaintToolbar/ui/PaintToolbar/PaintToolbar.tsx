import { IconButton } from "@/shared/ui/IconButton/IconButton";
import { Toolbar } from "@/shared/ui/Toolbar";
import { FaEraser } from "react-icons/fa6";
import {
  MdBrush,
  MdRectangle,
  MdCircle,
  MdUndo,
  MdRedo,
  MdSave,
} from "react-icons/md";
import LineIcon from "../../../../shared/assets/icons/line.svg?react";

export interface PaintToolbarProps {}

export const PaintToolbar = ({}: PaintToolbarProps) => {
  return (
    <Toolbar className="flex justify-between">
      <div className="flex items-center gap-2">
        <IconButton title="brush" Svg={MdBrush} />
        <IconButton title="rectangle" Svg={MdRectangle} />
        <IconButton title="circle" Svg={MdCircle} />
        <IconButton title="eraser" Svg={FaEraser} />
        <IconButton title="line" Svg={LineIcon} />
        <input
          title="change draw color"
          type="color"
          className="button-clear h-12"
        />
      </div>
      <div className="flex items-center gap-2">
        <IconButton title="brush" Svg={MdUndo} />
        <IconButton title="rectangle" Svg={MdRedo} />
        <IconButton title="circle" Svg={MdSave} />
      </div>
    </Toolbar>
  );
};
