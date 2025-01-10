import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Helper to resolve __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API endpoint to download reporting files
router.get("/download", (req, res) => {
  const fileName = req.query.fileName; // Get the file name from the query params
  if (!fileName) {
    return res.status(400).json({ error: "File name is required" });
  }

  const filePath = path.join(__dirname, "../ReportingFiles", fileName);
  console.log("Resolved file path:", filePath);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error("Error in downloading file:", err);
      return res.status(500).json({ error: "File not found or inaccessible" });
    }
  });
});

export default router;
