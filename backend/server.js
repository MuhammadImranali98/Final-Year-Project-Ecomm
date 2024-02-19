const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// dotenv.config()
//Handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to uncaught Exception`);
  process.exit(1);
});

//Config

dotenv.config({ path: "config/config.env" });

//connecting to database

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_url: process.env.CLOUDINARY_URL,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandeled Promised Rejestion

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to unhandeled Promise Rejection`);

  server.close(() => {
    process.exitCode(1);
  });
});
