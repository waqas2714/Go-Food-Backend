const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const createUser = require("./router/createUser");
const getFoodItems = require("./router/getFoodItems");
const OrderData = require("./router/orderData");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"]
  })
);
app.use("/api", createUser);
app.use("/api", getFoodItems);
app.use("/api", OrderData);

// Server Creation
const mongodbUrl = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(mongodbUrl)
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Running Server on port: ${PORT}`);
      console.log("MongoDB Connected!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
