import { useEffect, useRef, useState } from "react";
import { usePaintCanvasStore } from "../../model/paint-canvas-store";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { DrawMessage, Message } from "@/features/PaintToolbar/model/types/tool";
import { Brush } from "@/features/PaintToolbar/lib/tools/Brush";
import { Rectangle } from "@/features/PaintToolbar/lib/tools/Rectangle";
import axios from "axios";

export interface PaintCanvasProps {
  classname?: string;
}

export const PaintCanvas = ({ classname }: PaintCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCanvas = usePaintCanvasStore((state) => state.setCanvas);
  const pushToUndo = usePaintCanvasStore((state) => state.pushToUndo);
  const setAppUsername = usePaintCanvasStore((state) => state.setUsername);
  const setSocketId = usePaintCanvasStore((state) => state.setSocketId);
  const setSocket = usePaintCanvasStore((state) => state.setSocket);
  const [username] = useState(() => prompt("Enter your name"));
  const params = useParams();

  function drawHandler(msg: DrawMessage) {
    const figure = msg.figure;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx == null) {
      throw new Error("Invalid canvas context");
    }
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "rectangle":
        Rectangle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
        );
        break;
      case "finish":
        ctx.beginPath();
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (canvasRef.current !== null) {
      setCanvas(canvasRef.current);
      axios.get(`http://localhost:5001/image?id=${params.id}`).then((res) => {
        const img = new Image();
        img.src = res.data;
        img.onload = () => {
          if (canvasRef.current === null) {
            return;
          }
          const ctx = canvasRef.current.getContext("2d");
          if (ctx == null) {
            return;
          }
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          ctx.drawImage(img, 0, 0);
        };
      });
    } else {
      console.error("canvasRef is undefined");
    }
  }, [params.id, pushToUndo, setCanvas]);

  useEffect(() => {
    setAppUsername(username ?? "Anonymous");
    setSocketId(params.id!);
    const socket = new WebSocket(`ws://localhost:5001`);
    setSocket(socket);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          id: params.id,
          username: username,
          method: "connection",
        }),
      );
    };
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data) as Message;
      switch (msg.method) {
        case "connection":
          break;
        case "draw":
          drawHandler(msg);
          break;

        default:
          break;
      }
    };
  }, [params.id, setAppUsername, setSocket, setSocketId, username]);

  function mouseDownHandler(): void {
    const dataUrl = canvasRef.current?.toDataURL();
    if (dataUrl === undefined) {
      return;
    }

    pushToUndo(dataUrl);
  }

  function mouseUpHandler() {
    const dataUrl = canvasRef.current?.toDataURL();
    if (dataUrl === undefined) {
      return;
    }

    axios.post(`http://localhost:5001/image?id=${params.id}`, {
      img: dataUrl,
    });
  }

  return (
    <div className={clsx("h-full flex justify-center items-center", classname)}>
      <canvas
        width={600}
        height={400}
        ref={canvasRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        className="border-gray border-2 bg-white"
      />
    </div>
  );
};
