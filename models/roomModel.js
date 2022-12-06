const mongoose = require("mongoose");
const roomSchema = require("./roomSchema");
const cron = require("node-cron");

roomSchema.post("save", async function (room, next) {
  //will be updated

  console.log("This is from .post save in roomModel");
  //   const date = room.createdAt;
  const date = Date.parse(room.createdAt);
  //   console.log(date);

  //14 days
  const timeUntilDel = new Date(date + 10 * 1000);
  //   console.log(timeUntilDel.toString());
  //   console.log(
  //     `${timeUntilDel.getSeconds()} ${timeUntilDel.getMinutes()} ${timeUntilDel.getHours()} ${timeUntilDel.getDate()} ${timeUntilDel.getMonth()}`
  //   );
  //   cron.schedule("* * * * * *", () => {
  //     console.log(`The room will be delete at: ${timeUntilDel.toLocaleString()}`);
  //     roomModel.deleteOne({ _id: room._id });
  //   });

  next();
});

const roomModel = new mongoose.model("roomdata", roomSchema);

module.exports = roomModel;
