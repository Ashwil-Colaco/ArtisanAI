
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// Route to receive POST data
app.post("/ai", async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const response = await axios.post("http://127.0.0.1:8000/ai", req.body);

    // Log the response body received from the FastAPI server
    console.log("Response body from FastAPI:", response.data);

    // Send FastAPI's response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding to FastAPI:", error.message);
    res.status(500).json({ error: "Failed to reach AI service" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});