const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDB = require("./config/connectDB");
// const multer = require("multer");
const uploadRoute = require("./controllers/uploadRoute");
// const upload = multer({ dest: "uploads/" });
// const { cloudinary } = require("./utils/cloudinary");
const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"})
});

//config dotenv file
// dotenv.config();
require("dotenv").config();

//database call
connectDB();

//rest obj
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transactions routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));
//upload
// app.use("/api/upload", uploadRoute);
app.use("/api/v1/users", uploadRoute);
// app.post("/api/upload", async (res, req) => {
//   try {
//     const fileStr = req.body.data;
//     const uploadedReponse = await cloudinary.uploader.upload(fileStr, {
//       upload_preset: "dev_setups",
//     });
//     console.log(uploadedReponse);
//     res.json({ msg: "yayaya" });
//   } catch (error) {
//     console.error(error);
//     res.statusCode(500).json({ err: "something wong" });
//   }
// });
//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = 8080 || process.env.PORT;

//listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});
