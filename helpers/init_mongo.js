const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

console.log(DB_URI);

mongoose
  .connect(DB_URI, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas DB");
  })
  .catch((err) => {
    console.log("Mongoose Connection Error: " + err.message);
  });

try {
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connection is established");
  });
} catch (err) {
  console.log(err);
}

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
