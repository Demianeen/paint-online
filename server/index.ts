import express from "express";
import expressWs from "express-ws";
import WebSocket from "ws";
import cors from "cors";
import fs from "fs";
import path from "path";

const expressServer = express();
const wsServer = expressWs(expressServer);
const app = wsServer.app;
const wss = wsServer.getWss();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.ws("/", (ws, req) => {
  console.log("Connected");
  ws.send("Connection was successful");
  ws.on("message", (msg) => {
    const parsedMsg = JSON.parse(msg.toString());
    switch (parsedMsg.method) {
      case "connection":
        connectionHanlder(ws, parsedMsg);
        break;
      case "draw":
        broadcastConnection(ws, parsedMsg);
        break;

      default:
        break;
    }
  });
});

app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replace("data:image/png;base64,", "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", req.query.id + ".png"),
      data,
      "base64",
    );
    return res.status(200).json("ok");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong. Try again later");
  }
});
app.get("/image", (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", req.query.id + ".png"),
    );
    const data = "data:image/png;base64," + file.toString("base64");
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong. Try again later");
  }
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

function connectionHanlder(ws: WebSocket, msg: any) {
  // @ts-expect-error
  ws.id = msg.id;
  broadcastConnection(ws, msg);
}

function broadcastConnection(ws: WebSocket, msg: any) {
  wss.clients.forEach((client) => {
    // @ts-expect-error
    console.log("Potential client", client.id, msg);
    // @ts-expect-error
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
}
