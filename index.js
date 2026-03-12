import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {

 console.log("MongoDB connected");

 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
 });

})
.catch((err) => {
 console.log(err);
});


// Routes
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("API is running");
});

// Error handling for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));