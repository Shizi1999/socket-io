require("dotenv").config();
const express = require("express");
const app = express();
const sever = require("http").createServer(app);
const io = require("socket.io")(sever, { cors: { origin: "*" } });

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

sever.listen(process.env.PORT || 3000, () => {
  console.log("listen on port 3000");
});

io.on("connection", (socket) => {
  socket.on("Client-send-message", (data) => {
    io.emit("Sever-send-message", data);
  });
});
