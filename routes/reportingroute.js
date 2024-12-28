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

// Route to fetch paginated data dynamically
router.get("/get-data", async (req, res) => {
  try {
    // Extract pagination parameters from the query
    const { page = 1, pageSize = 50 } = req.query;

    // Fetch all the data from the database
    const allData = await Reporting.find();

    // Perform calculations for each column before pagination
    const calculateCampaignSums = (data, columnKey, divideBy = 1) => {
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

        // Only sum the first occurrence of each device for the campaign
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

      // Divide the sums if needed
      Object.keys(campaignSums).forEach((pageName) => {
        Object.keys(campaignSums[pageName]).forEach((entryDate) => {
          Object.keys(campaignSums[pageName][entryDate]).forEach(
            (campaignName) => {
              campaignSums[pageName][entryDate][campaignName].sum =
                campaignSums[pageName][entryDate][campaignName].sum / divideBy;
            }
          );
        });
      });

      return campaignSums;
    };

    const calculateCampaignCount = (data) => {
      const campaignCounts = {};

      data.forEach((row) => {
        const pageName = row["Page Name"];
        const entryDate = row["Entry Date"];
        const campaignName = row["Campaign Name"];

        if (!campaignCounts[pageName]) {
          campaignCounts[pageName] = new Set();
        }

        // Use a combination of campaignName and entryDate to ensure uniqueness
        campaignCounts[pageName].add(`${campaignName}_${entryDate}`);
      });

      // Convert sets to counts
      Object.keys(campaignCounts).forEach((pageName) => {
        campaignCounts[pageName] = campaignCounts[pageName].size;
      });
      console.log("count sir usama", campaignCounts);
      return campaignCounts;
    };

    const amountSpentSums = calculateCampaignSums(allData, "Amount Spent");
    const impressionsSums = calculateCampaignSums(allData, "Impressions");
    const reachSums = calculateCampaignSums(allData, "Reach");
    const resultsSums = calculateCampaignSums(allData, "Results");
    const linkClicksSums = calculateCampaignSums(allData, "Link Clicks");

    const cpcSums = calculateCampaignSums(
      allData,
      "CPC (cost per link click)",
      5
    );
    const cpmSums = calculateCampaignSums(
      allData,
      "CPM (cost per 1,000 impressions)",
      5
    );
    const ctrSums = calculateCampaignSums(allData, "CTR (all)", 5);

    // Calculate totals for each column by Page Name
    const calculatePageTotals = (data, columnKey) => {
      const pageTotals = {};

      data.forEach((row) => {
        const pageName = row["Page Name"];
        const columnValue = parseFloat(row[columnKey] || 0);

        if (!pageTotals[pageName]) {
          pageTotals[pageName] = 0;
        }

        pageTotals[pageName] += columnValue;
      });

      return pageTotals;
    };

    const amountSpentTotals = calculatePageTotals(allData, "Amount Spent");
    const impressionsTotals = calculatePageTotals(allData, "Impressions");
    const reachTotals = calculatePageTotals(allData, "Reach");
    const resultsTotals = calculatePageTotals(allData, "Results");
    const linkClicksTotals = calculatePageTotals(allData, "Link Clicks");
    const cpcTotals = calculatePageTotals(allData, "CPC (cost per link click)");
    const cpmTotals = calculatePageTotals(
      allData,
      "CPM (cost per 1,000 impressions)"
    );
    const ctrTotals = calculatePageTotals(allData, "CTR (all)");

    const campaignCounts = calculateCampaignCount(allData);

    const processedData = allData.map((row, index) => {
      const pageName = row["Page Name"];
      const entryDate = row["Entry Date"];
      const campaignName = row["Campaign Name"];
      const isFirstRow =
        index ===
        allData.findIndex(
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
        { key: "CPC (cost per link click)", sums: cpcSums },
        { key: "CPM (cost per 1,000 impressions)", sums: cpmSums },
        { key: "CTR (all)", sums: ctrSums },
      ];

      columns.forEach(({ key, sums }) => {
        if (isFirstRow && (!row[key] || row[key] === "")) {
          const sum =
            sums[pageName]?.[entryDate]?.[campaignName]?.sum?.toFixed(2) || 0;
          row[key] = sum;

          for (let i = 1; i <= 3; i++) {
            const nextRow = allData[index + i];
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

      // Insert page totals in the first row of the page
      if (index === allData.findIndex((r) => r["Page Name"] === pageName)) {
        const campaignCount = campaignCounts[pageName] || 1;
        row["Amount Spent"] = amountSpentTotals[pageName]?.toFixed(2) || "0";
        row["Impressions"] = impressionsTotals[pageName]?.toFixed(2) || "0";
        row["Reach"] = reachTotals[pageName]?.toFixed(2) || "0";
        row["Results"] = resultsTotals[pageName]?.toFixed(2) || "0";
        row["Link Clicks"] = linkClicksTotals[pageName]?.toFixed(2) || "0";
        row["CPC (cost per link click)"] =
          (cpcTotals[pageName] / campaignCount)?.toFixed(2) || "0";
        row["CPM (cost per 1,000 impressions)"] =
          (cpmTotals[pageName] / campaignCount)?.toFixed(2) || "0";
        row["CTR (all)"] =
          (ctrTotals[pageName] / campaignCount)?.toFixed(2) || "0";
      }

      return row;
    });

    // Apply pagination after processing the data
    const paginatedData = processedData.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    res.status(200).json({
      data: paginatedData,
      total: allData.length,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router;
