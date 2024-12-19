const express = require("express");
const cors = require("cors"); 
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes")
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(
    cors({
        origin: "*", 
        methods: ["GET", "POST", "PUT", "DELETE"], 
        allowedHeaders: ["Content-Type", "Authorization"], 
    })
);

app.use("/api/user", userRoutes);
app.use("/api/payment",paymentRoutes)

app.listen(5500, () => console.log("Server is running on port 5500"));
