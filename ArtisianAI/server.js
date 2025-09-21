import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // allows requests from any origin
app.use(express.json()); // parses JSON in POST requests

// Route to receive POST data
app.post("/ai", (req, res) => {
  console.log("Received data:", req.body); // <- prints sent data
  res.json({ message: "Data received successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
