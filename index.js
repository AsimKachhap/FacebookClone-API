const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

require("dotenv").config();

mongoose.connect(process.env.MONGO_CONNECTION, (err) => {
  if (err) console.log(err.message);
  console.log("CONNECTED TO DB");
});

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`SERVER is up and running at PORT ${PORT}`);
});
