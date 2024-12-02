const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

const express = require('express');
const connectDB = require("./config/db");
const app = express();

app.use(express.json()); // to accept json data
dotenv.config();
connectDB();
console.log(process.env.JWT_SECRET)
app.use("/api/user", userRoutes);


app.listen(5000,console.log('server is running'))
