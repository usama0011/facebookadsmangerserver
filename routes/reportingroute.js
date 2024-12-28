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

// Helper function to process data dynamically
const calculateCampaignSums = (data, columnKey) => {
  const campaignSums = {};

  data.forEach((row) => {
    const pageName = row["Page Name"];
    const entryDate = row["Entry Date"];
    const campaignName = row["Campaign Name"];
    const impressionDevice = row["Impression Device"];
    const columnValue = parseFloat(row[columnKey] || 0);

    if (!campaignSums[pageName]) {
      campaignSums[pageName] = {};
    }

    if (!campaignSums[pageName][entryDate]) {
      campaignSums[pageName][entryDate] = {};
    }

    if (!campaignSums[pageName][entryDate][campaignName]) {
      campaignSums[pageName][entryDate][campaignName] = {
        sum: 0,
        devices: new Set(),
      };
    }

    // Only sum the first occurrence of each device
    if (
      !campaignSums[pageName][entryDate][campaignName].devices.has(
        impressionDevice
      )
    ) {
      campaignSums[pageName][entryDate][campaignName].sum += columnValue;
      campaignSums[pageName][entryDate][campaignName].devices.add(
        impressionDevice
      );
    }
  });

  return campaignSums;
};

// Helper function to calculate totals at the page level
const calculatePageTotals = (data, columnKey) => {
  const pageTotals = {};

  data.forEach((row) => {
    const pageName = row["Page Name"];
    const campaignName = row["Campaign Name"];
    const columnValue = parseFloat(row[columnKey] || 0);

    if (!pageTotals[pageName]) {
      pageTotals[pageName] = 0;
    }

    // Add only one figure from each campaign under the same page name
    if (campaignName !== "All" && columnValue > 0) {
      pageTotals[pageName] += columnValue;
    }
  });

  return pageTotals;
};

// Route to fetch paginated data dynamically
router.get("/get-data", async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const { page = 1, pageSize = 50 } = req.query;

    // Fetch the raw data from the database with pagination
    const totalCount = await Reporting.countDocuments();
    const data = await Reporting.find()
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));

    // Perform calculations for each column
    const amountSpentSums = calculateCampaignSums(data, "Amount Spent");
    const impressionsSums = calculateCampaignSums(data, "Impressions");
    const reachSums = calculateCampaignSums(data, "Reach");
    const resultsSums = calculateCampaignSums(data, "Results");
    const linkClicksSums = calculateCampaignSums(data, "Link Clicks");

    const pageTotals = {
      "Amount Spent": calculatePageTotals(data, "Amount Spent"),
      Impressions: calculatePageTotals(data, "Impressions"),
      Reach: calculatePageTotals(data, "Reach"),
      Results: calculatePageTotals(data, "Results"),
      "Link Clicks": calculatePageTotals(data, "Link Clicks"),
    };

    const processedData = data.map((row, index) => {
      const pageName = row["Page Name"];
      const entryDate = row["Entry Date"];
      const campaignName = row["Campaign Name"];
      const isFirstRow =
        index ===
        data.findIndex(
          (r) =>
            r["Page Name"] === pageName &&
            r["Entry Date"] === entryDate &&
            r["Campaign Name"] === campaignName
        );

      const columns = [
        { key: "Amount Spent", sums: amountSpentSums },
        { key: "Impressions", sums: impressionsSums },
        { key: "Reach", sums: reachSums },
        { key: "Results", sums: resultsSums },
        { key: "Link Clicks", sums: linkClicksSums },
      ];

      columns.forEach(({ key, sums }) => {
        if (isFirstRow && (!row[key] || row[key] === "")) {
          const sum =
            sums[pageName][entryDate][campaignName]?.sum?.toFixed(2) || 0;
          row[key] = sum;

          for (let i = 1; i <= 3; i++) {
            const nextRow = data[index + i];
            if (
              nextRow &&
              nextRow["Page Name"] === pageName &&
              nextRow["Entry Date"] === entryDate &&
              nextRow["Campaign Name"] === campaignName &&
              (!nextRow[key] || nextRow[key] === "")
            ) {
              nextRow[key] = sum;
            } else {
              break;
            }
          }
        }
      });

      const campaignsUnderPage = data.filter(
        (r) => r["Page Name"] === pageName && r["Campaign Name"] !== "All"
      );
      if (
        index ===
          data.findIndex(
            (r) => r["Page Name"] === pageName && r["Campaign Name"] === "All"
          ) &&
        campaignsUnderPage.length > 1
      ) {
        row["Amount Spent"] = pageTotals["Amount Spent"][pageName].toFixed(2);
        row["Impressions"] = pageTotals["Impressions"][pageName].toFixed(2);
        row["Reach"] = pageTotals["Reach"][pageName].toFixed(2);
        row["Results"] = pageTotals["Results"][pageName].toFixed(2);
        row["Link Clicks"] = pageTotals["Link Clicks"][pageName].toFixed(2);
      }

      return row;
    });

    res.status(200).json({
      data: processedData,
      total: totalCount,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
