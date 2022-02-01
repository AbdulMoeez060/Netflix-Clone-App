const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute  = require("./routes/auth");
const usersRoute  = require("./routes/users");


dotenv.config();


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err)
);

app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute)

app.listen(3000, () => {
  console.log("Backend server is running");
});
