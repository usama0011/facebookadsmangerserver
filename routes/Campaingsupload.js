import express from "express";
import multer from "multer";
import csv from "csv-parser";
import Lead from "../models/newcompaingmodel.js";
import { Stream } from "stream";

const router = express();

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Route to handle CSV upload
// Route to handle CSV upload

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const results = [];
    const fileBuffer = req.file.buffer.toString("utf8");
    const readableStream = Stream.Readable.from(fileBuffer.split("\n"));
    const csvParser = csv();

    await new Promise((resolve, reject) => {
      readableStream
        .pipe(csvParser)
        .on("data", (data) => {
          console.log("Parsed data:", data);

          if (data.mobile) {
            const mobileDigits = data.mobile.match(/\d{10}$/);
            data.mobile = mobileDigits ? mobileDigits[0] : "";
          }
          if (data.status) {
            data.status = data.status.toLowerCase();
          }

          // Remove commas from numeric fields and convert to floats
          const numericFields = [
            "Reach",
            "Impressions",
            "Budget",
            "Results",
            "Costperresult",
            "Amountspent",
            "CPM",
            "LinksClicks",
            "CPC",
            "CTR",
            "clicksAll",
            "CTRALL",
            "CPCAll",
          ];
          numericFields.forEach((field) => {
            if (data[field]) {
              data[field] = parseFloat(data[field].replace(/,/g, ""));
            }
          });

          results.push(data);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log("Inserting data:", results);

    await Lead.insertMany(results);

    res.status(200).json({
      success: true,
      message: "Campaigns data successfully uploaded",
    });
  } catch (error) {
    console.error("Error:", error.message);
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      errormsg: error.message,
    });
  }
});

export default router;
