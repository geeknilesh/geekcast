const fs = require("fs");

const socketConnection = (sslServer) => {
  const io = require("socket.io")(sslServer);

  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      console.log("Someone joined: " + userId);
      saveRoomDetails(roomId);
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("user-connected", userId);
      socket.on("disconnect", () => {
        console.log("xxx User disconnected!!! xxx");
        socket.broadcast.to(roomId).emit("user-disconnected", userId);
      });
    });
  });
};

async function saveRoomDetails(roomId) {
  await fs.readFile("./db/data.json", async (err, data) => {
    if (err) throw err;
    console.log("reading");
    var json = JSON.parse(data);

    function searchRoom(roomId, arr) {
      if (arr.includes(roomId)) return false;
      else return true;
    }

    if (json.rooms.includes(roomId)) {
      json.rooms.push(roomId);
    }

    console.log(json);

    await fs.writeFile("./db/data.json", JSON.stringify(json), {}, () => {
      console.log("wrote");
    });
  });
}

module.exports = {
  socketConnection,
};
