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

router.get("/reporting/summed", async (req, res) => {
  try {
    // Extract filter parameters from query
    const { campaignName, startDate, endDate } = req.query;

    // Build the filter criteria dynamically
    const filterCriteria = {};

    if (campaignName) {
      filterCriteria["Campaign Name"] = campaignName;
    }

    if (startDate && endDate) {
      filterCriteria["Entry Date"] = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // Filter the data based on criteria before aggregation
    const filteredData = await Reporting.find(filterCriteria);

    let aggregatedData = await Reporting.aggregate([
      {
        $match: filterCriteria,
      },
      {
        $addFields: {
          normalizedPlacement: { $toLower: { $trim: { input: "$Placement" } } },
          normalizedImpressionDevice: {
            $toLower: { $trim: { input: "$Impression Device" } },
          },
          convertedAmountSpent: {
            $convert: {
              input: "$Amount Spent",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
          convertedImpressions: {
            $convert: {
              input: "$Impressions",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
          convertedLinkClicks: {
            $convert: {
              input: "$Link Clicks",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: {
            "Page ID": "$Page ID",
            "Page Name": "$Page Name",
            "Campaign Name": "$Campaign Name",
            "Ad Set Name": "$Ad Set Name",
            "Ad Name": "$Ad Name",
            "Ad Creative": "$Ad Creative",
            "Impression Device": "$normalizedImpressionDevice",
            Placement: "$normalizedPlacement",
          },
          "Amount Spent": { $sum: "$convertedAmountSpent" },
          Impressions: { $sum: "$convertedImpressions" },
          Reach: { $sum: "$Reach" },
          "Link Clicks": { $sum: "$convertedLinkClicks" },
        },
      },
      {
        $addFields: {
          CPC: {
            $cond: [
              { $eq: ["$Link Clicks", 0] },
              null,
              { $divide: ["$Amount Spent", "$Link Clicks"] },
            ],
          },
          CPM: {
            $cond: [
              { $eq: ["$Impressions", 0] },
              null,
              {
                $multiply: [
                  { $divide: ["$Amount Spent", "$Impressions"] },
                  1000,
                ],
              },
            ],
          },
          CTR: {
            $cond: [
              { $eq: ["$Impressions", 0] },
              null,
              {
                $multiply: [{ $divide: ["$Link Clicks", "$Impressions"] }, 100],
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          "Page ID": "$_id.Page ID",
          "Page Name": "$_id.Page Name",
          "Campaign Name": "$_id.Campaign Name",
          "Ad Set Name": "$_id.Ad Set Name",
          "Ad Name": "$_id.Ad Name",
          "Ad Creative": "$_id.Ad Creative",
          "Impression Device": "$_id.Impression Device",
          Placement: "$_id.Placement",
          "Amount Spent": 1,
          Impressions: 1,
          Reach: 1,
          "Link Clicks": 1,
          CPC: 1,
          CPM: 1,
          CTR: 1,
        },
      },
      {
        $sort: {
          "Page Name": 1,
          "Campaign Name": 1,
          "Ad Set Name": 1,
          "Ad Name": 1,
          "Impression Device": 1,
          Placement: 1,
        },
      },
    ]);

    // Sum metrics for each device under "all" placement for each campaign
    const campaignDeviceTotals = {};

    aggregatedData.forEach((entry) => {
      if (entry.Placement === "all") {
        const campaignKey = entry["Campaign Name"];
        const deviceKey = entry["Impression Device"];

        if (!campaignDeviceTotals[campaignKey]) {
          campaignDeviceTotals[campaignKey] = {
            "device: android smartphone": {
              amountSpent: 0,
              impressions: 0,
              reach: 0,
              linkClicks: 0,
            },
            "device: android tablet": {
              amountSpent: 0,
              impressions: 0,
              reach: 0,
              linkClicks: 0,
            },
            "device: desktop": {
              amountSpent: 0,
              impressions: 0,
              reach: 0,
              linkClicks: 0,
            },
            "device: ipad": {
              amountSpent: 0,
              impressions: 0,
              reach: 0,
              linkClicks: 0,
            },
            "device: iphone": {
              amountSpent: 0,
              impressions: 0,
              reach: 0,
              linkClicks: 0,
            },
          };
        }

        if (campaignDeviceTotals[campaignKey][deviceKey] != null) {
          campaignDeviceTotals[campaignKey][deviceKey].amountSpent +=
            entry["Amount Spent"];
          campaignDeviceTotals[campaignKey][deviceKey].impressions +=
            entry.Impressions;
          campaignDeviceTotals[campaignKey][deviceKey].reach += entry.Reach;
          campaignDeviceTotals[campaignKey][deviceKey].linkClicks +=
            entry["Link Clicks"];
        }
      }
    });

    // Sum all device totals under each campaign for each metric
    const campaignTotals = {};
    Object.keys(campaignDeviceTotals).forEach((campaignKey) => {
      campaignTotals[campaignKey] = {
        amountSpent: 0,
        impressions: 0,
        reach: 0,
        linkClicks: 0,
        cpc: null,
        cpm: null,
        ctr: null,
      };

      let totalImpressions = 0;
      let totalLinkClicks = 0;
      let totalAmountSpent = 0;

      Object.values(campaignDeviceTotals[campaignKey]).forEach(
        (deviceTotals) => {
          campaignTotals[campaignKey].amountSpent += deviceTotals.amountSpent;
          campaignTotals[campaignKey].impressions += deviceTotals.impressions;
          campaignTotals[campaignKey].reach += deviceTotals.reach;
          campaignTotals[campaignKey].linkClicks += deviceTotals.linkClicks;

          totalImpressions += deviceTotals.impressions;
          totalLinkClicks += deviceTotals.linkClicks;
          totalAmountSpent += deviceTotals.amountSpent;
        }
      );

      // Calculate CPC, CPM, CTR
      campaignTotals[campaignKey].cpc = totalLinkClicks
        ? totalAmountSpent / totalLinkClicks
        : null;
      campaignTotals[campaignKey].cpm = totalImpressions
        ? (totalAmountSpent / totalImpressions) * 1000
        : null;
      campaignTotals[campaignKey].ctr = totalImpressions
        ? (totalLinkClicks / totalImpressions) * 100
        : null;
    });

    // Update the empty cells under each campaign with the summed values
    aggregatedData = aggregatedData.map((entry) => {
      if (
        entry["Amount Spent"] === 0 &&
        entry.Impressions === 0 &&
        entry.Reach === 0 &&
        entry["Link Clicks"] === 0
      ) {
        const campaignKey = entry["Campaign Name"];
        if (campaignTotals[campaignKey] != null) {
          entry["Amount Spent"] = campaignTotals[campaignKey].amountSpent;
          entry.Impressions = campaignTotals[campaignKey].impressions;
          entry.Reach = campaignTotals[campaignKey].reach;
          entry["Link Clicks"] = campaignTotals[campaignKey].linkClicks;
          entry.CPC = campaignTotals[campaignKey].cpc;
          entry.CPM = campaignTotals[campaignKey].cpm;
          entry.CTR = campaignTotals[campaignKey].ctr;
        }
      }
      return entry;
    });
    // Generate the summary row for each unique Page Name
    const pageSummaryRows = [];
    const uniquePageNames = new Set(
      aggregatedData.map((entry) => entry["Page Name"])
    );

    uniquePageNames.forEach((pageName) => {
      const campaigns = aggregatedData.filter(
        (entry) => entry["Page Name"] === pageName
      );

      const processedCampaignNames = new Set();
      let totalAmountSpent = 0;
      let totalImpressions = 0;
      let totalReach = 0;
      let totalLinkClicks = 0;

      campaigns.forEach((campaign) => {
        if (!processedCampaignNames.has(campaign["Campaign Name"])) {
          totalAmountSpent += campaign["Amount Spent"];
          totalImpressions += campaign.Impressions;
          totalReach += campaign.Reach;
          totalLinkClicks += campaign["Link Clicks"];
          processedCampaignNames.add(campaign["Campaign Name"]);
        }
      });
      // Calculate CPC, CPM, and CTR
      const cpc = totalLinkClicks > 0 ? totalAmountSpent / totalLinkClicks : 0;
      const cpm =
        totalImpressions > 0 ? (totalAmountSpent / totalImpressions) * 1000 : 0;
      const ctr =
        totalImpressions > 0 ? (totalLinkClicks / totalImpressions) * 100 : 0;

      pageSummaryRows.push({
        "Page Name": pageName,
        "Campaign Name": "All",
        "Ad Set Name": "All",
        "Ad Name": "All",
        "Ad Creative": "All",
        "Impression Device": "All",
        Placement: "All",
        "Amount Spent": totalAmountSpent,
        Impressions: totalImpressions,
        Reach: totalReach,
        "Link Clicks": totalLinkClicks,
        CPC: cpc,
        CPM: cpm,
        CTR: ctr,
      });
    });

    aggregatedData = [...pageSummaryRows, ...aggregatedData];
    // Sort to ensure summary rows remain at the top
    aggregatedData.sort((a, b) => {
      if (a["Campaign Name"] === "All" && b["Campaign Name"] !== "All")
        return -1;
      if (b["Campaign Name"] === "All" && a["Campaign Name"] !== "All")
        return 1;
      return 0;
    });
    res.status(200).json(aggregatedData);
  } catch (error) {
    console.error("Error fetching summed reporting data:", error);
    res.status(500).json({ error: "Failed to fetch reporting data" });
  }
});

export default router;
