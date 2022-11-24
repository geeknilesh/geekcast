const express = require("express");
const app = express();
const https = require("https");
const path = require("path");
const fs = require("fs");
// const server = require("http").Server(app);
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);
const io = require("socket.io")(sslServer);
const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log("Someone joined: " + userId);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    socket.on("disconnect", () => {
      console.log("xxx User disconnected!!! xxx");
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

// server.listen(3000);

sslServer.listen(443, () => console.log("Secure server 🚀🔑 on port 3443"));
