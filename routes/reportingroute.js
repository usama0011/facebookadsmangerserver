import express from "express";
import multer from "multer";
import csv from "csv-parser";
import { Readable } from "stream";
import Reporting from "../models/reportingmodel.js";

const router = express.Router();

// Configure multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload CSV and save data to the database
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Check if the file is provided
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Prepare to parse the CSV
    const fileBuffer = req.file.buffer.toString("utf8");
    const readableStream = Readable.from(fileBuffer);

    const results = [];

    // Parse the CSV data
    await new Promise((resolve, reject) => {
      readableStream
        .pipe(csv())
        .on("data", (data) => {
          // Process fields if needed (e.g., remove unwanted characters)
          Object.keys(data).forEach((key) => {
            data[key] = data[key]?.trim();
          });

          results.push(data);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // Save data to the database
    await Reporting.insertMany(results);

    res.status(200).json({
      success: true,
      message: "CSV data uploaded and saved successfully",
      count: results.length,
    });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload CSV data",
      error: error.message,
    });
  }
});

// Get all data
router.get("/get-data", async (req, res) => {
  try {
    const data = await Reporting.find(); // Fetch all data from the Reporting collection
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
