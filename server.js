const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const simRoutes = require("./Routes/route");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use(cors({
  origin: 'https://frontend-chi-pearl.vercel.app/',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  credentials: true 
}));


mongoose
  .connect("mongodb://localhost:27017/simcards", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
app.get("/", (req, res) => {
  res.send("API is running. Access it via /api");
});

// Use routes
app.use("/api", simRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
