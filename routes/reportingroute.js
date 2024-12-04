import express from "express";
import fs from "fs";
import multer from "multer";
import csvParser from "csv-parser";
import Campaign from "../models/reportingmodel.js";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Stream-based upload and CSV parsing route
router.post("/upload", upload.single("file"), (req, res) => {
  // Stream-based approach for improved memory management
  const campaigns = [];
  const filePath = req.file.path;

  const fileStream = fs
    .createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      campaigns.push(row);
    })
    .on("end", async () => {
      try {
        // Use Mongoose insertMany to add campaigns to the database
        await Campaign.insertMany(campaigns);
        res.status(200).json({ message: "CSV file uploaded and data stored!" });
      } catch (err) {
        res
          .status(400)
          .json({ error: "Failed to store data", details: err.message });
      } finally {
        // Remove the uploaded file after processing
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
    })
    .on("error", (err) => {
      res
        .status(500)
        .json({ error: "Error reading CSV file", details: err.message });
      // Ensure file is deleted if an error occurs
      fs.unlink(filePath, (deleteErr) => {
        if (deleteErr)
          console.error("Error deleting file after failure:", deleteErr);
      });
    });
});

// Get all campaigns route
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find({});
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving data",
      error: error.message,
    });
  }
});

export default router;
