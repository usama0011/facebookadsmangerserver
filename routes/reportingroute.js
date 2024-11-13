// routes/campaignRoutes.js
import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Reporting from "../models/reportingmodel.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route to upload CSV data
router.post("/upload", upload.single("file"), (req, res) => {
  const campaigns = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      campaigns.push({
        campaignName: data["Campaign name"],
        adSetName: data["Ad Set Name"],
        ads: data["Ads"],
        impressionDevice: data["Impression device"],
        placement: data["Placement"],
        pageID: data["Page ID"],
        deliveryStatus: data["Delivery status"],
        deliveryLevel: data["Delivery level"],
        reach: parseInt(data["Reach"]),
        impressions: parseInt(data["Impressions"]),
        frequency: parseFloat(data["Frequency"]),
        attributionSetting: data["Attribution setting"],
        resultType: data["Result type"],
        results: parseInt(data["Results"]),
        amountSpent: parseFloat(data["Amount spent (PKR)"]),
        costPerResult: parseFloat(data["Cost per result"]),
        starts: new Date(data["Starts"]),
        ends: data["Ends"],
        reportingStarts: new Date(data["Reporting starts"]),
        reportingEnds: new Date(data["Reporting ends"]),
      });
    })
    .on("end", async () => {
      try {
        await Reporting.insertMany(campaigns);
        fs.unlinkSync(req.file.path); // Clean up uploaded file
        res.status(200).send("CSV data uploaded successfully.");
      } catch (error) {
        res.status(500).send("Error uploading data");
      }
    });
});

// Route to fetch campaigns filtered by pageID
router.get("/campaigns/:pageID", async (req, res) => {
  try {
    const campaigns = await Reporting.find({ pageID: req.params.pageID });
    res.json(campaigns);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

export default router;
