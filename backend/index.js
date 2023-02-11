const express = require("express");
const app = express();

const postRoute = require("./Routes/postRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://Ayush:PasswordAyush1`@cluster0.id4t1mv.mongodb.net/Blog?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log(err);
    }
    app.listen(3000);
  }
);
app.use(cors());
app.use(express.json());
app.use(postRoute);
app.use(userRoutes);
