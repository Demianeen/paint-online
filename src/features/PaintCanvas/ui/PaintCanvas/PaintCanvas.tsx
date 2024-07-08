export interface PaintCanvasProps {}

export const PaintCanvas = ({}: PaintCanvasProps) => {
  return (
    <div className="h-full flex justify-center items-center">
      <canvas
        width={600}
        height={400}
        className="border-gray border-2 bg-white"
      />
    </div>
  );
};
