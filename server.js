const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const uploadRouter = require("./routes/upload");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

//middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/upload", uploadRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
