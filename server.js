const express = require("express");
const app = express();
const https = require("https");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const homeRoute = require("./routes/homeRoute");
require("./helpers/init_mongo.js");

// const server = require("http").Server(app);

// app.use(express.urlencoded({ ext ended: true }));

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

// const io = require("socket.io")(sslServer);

// const { socketConnection } = require("./utils/socketConnection");

// console.log(sslServer);
// socketConnection(sslServer);

const io = require("socket.io")(sslServer);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log("Someone joined: " + userId);
    // saveRoomDetails(roomId);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    socket.on("disconnect", () => {
      console.log("xxx User disconnected!!! xxx");
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("./uploads"));

app.use("/", homeRoute);
// server.listen(3000);

sslServer.listen(3443, () => console.log("Secure server 🚀🔑 on port 3443"));
