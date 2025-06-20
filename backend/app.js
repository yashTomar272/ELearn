require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/connection");

const PORT = process.env.PORT || 8000;


const router = require("./routes/user");
const courseRoutes=require("./routes/courses")
const favRoutes=require("./routes/favourite")
const purchaseCourse=require("./routes/purchaseCourse")
const ss = require("./stripe/createCheckoutSession");


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(router);
app.use(courseRoutes);
app.use(favRoutes);
app.use(purchaseCourse);
app.use(ss);



// Test Route
app.get("/", (req, res) => {
    res.send("Hello pong");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});