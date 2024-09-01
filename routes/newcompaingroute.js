import express from "express";
import Campaign from "../models/newcompaingmodel.js";

const router = express.Router();

// GET all campaigns

router.get("/", async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log("Received startDate:", startDate, "endDate:", endDate);

  try {
    let matchStage = {};
    if (startDate && endDate) {
      // Convert dates to 'YYYY-MM-DD' format
      const parsedStartDate = new Date(startDate).toISOString().split("T")[0];
      const parsedEndDate = new Date(endDate).toISOString().split("T")[0];

      console.log(
        "Parsed startDate:",
        parsedStartDate,
        "Parsed endDate:",
        parsedEndDate
      );

      matchStage = {
        entryDate: {
          $gte: parsedStartDate,
          $lte: parsedEndDate,
        },
      };
    }

    const campaigns = await Campaign.find(matchStage);
    // If date range is not provided, return all campaigns
    if (!startDate || !endDate) {
      return res.status(200).json(campaigns);
    }
    // Group campaigns by name
    const campaignMap = campaigns.reduce((acc, campaign) => {
      if (!acc[campaign.campaingname]) {
        acc[campaign.campaingname] = [];
      }
      acc[campaign.campaingname].push(campaign);
      return acc;
    }, {});

    const aggregatedCampaigns = [];
    const uniqueCampaigns = [];

    for (const [name, campaigns] of Object.entries(campaignMap)) {
      if (campaigns.length > 1) {
        // Aggregate campaigns with the same name
        const aggregated = campaigns.reduce(
          (acc, campaign) => {
            acc.Results += campaign.Results;
            acc.Reach += campaign.Reach;
            acc.Impressions += campaign.Impressions;
            acc.Amountspent += campaign.Amountspent;
            acc.LinksClicks += campaign.LinksClicks || 0; // Sum LinksClicks
            acc.clicksAll += campaign.clicksAll || 0; // Sum clicksAll

            // Add new logic
            acc.CPM = Math.max(acc.CPM, campaign.CPM || 0);
            acc.CPC = Math.max(acc.CPC, campaign.CPC || 0);
            acc.CTR = Math.max(acc.CTR, campaign.CTR || 0);
            acc.CTRALL = Math.max(acc.CTRALL, campaign.CTRALL || 0);
            acc.CPCAll = Math.max(acc.CPCAll, campaign.CPCAll || 0);
            return acc;
          },
          {
            _id: campaigns[0]._id,
            currentSwitch: campaigns[0].currentSwitch,
            campaingname: campaigns[0].campaingname,
            campainglink: campaigns[0].campainglink,
            adname: campaigns[0].adname,
            Delivery: campaigns[0].Delivery,
            Bidstrategy: campaigns[0].Bidstrategy,
            Budget: campaigns[0].Budget,
            Attributionsetting: campaigns[0].Attributionsetting,
            Results: 0,
            Reach: 0,
            Impressions: 0,
            Costperresult: campaigns[0].Costperresult,
            Amountspent: 0,
            Ends: campaigns[0].Ends,
            campaingImage: campaigns[0].campaingImage,
            entryDate: campaigns[0].entryDate,
            lastSignificent: campaigns[0].lastSignificent,
            schedule: campaigns[0].schedule,
            qualityRanking: campaigns[0].qualityRanking,
            engagementrateranking: campaigns[0].engagementrateranking,
            conversionrateranking: campaigns[0].conversionrateranking,
            createdAt: campaigns[0].createdAt,
            updatedAt: campaigns[0].updatedAt,
            quoteheading: campaigns[0].quoteheading, // Include the quoteheading
            quotetext: campaigns[0].quotetext, // Include the quotetext
            frequency: campaigns[0].frequency, // Include the frequency
            // Initialize new fields with default values
            CPM: campaigns[0].CPM || 0,
            LinksClicks: 0,
            CPC: campaigns[0].CPC || 0,
            CTR: campaigns[0].CTR || 0,
            clicksAll: 0,
            CTRALL: campaigns[0].CTRALL || 0,
            CPCAll: campaigns[0].CPCAll || 0,
          }
        );
        aggregatedCampaigns.push(aggregated);
      } else {
        // Directly add unique campaigns
        uniqueCampaigns.push(campaigns[0]);
      }
    }

    // Combine aggregated campaigns and unique campaigns
    const combinedResults = [...aggregatedCampaigns, ...uniqueCampaigns];

    res.status(200).json(combinedResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET a single campaign
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/testroute/facebook", async (req, res) => {
  try {
    const campaign = await Campaign.find();
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new campaign
router.post("/", async (req, res) => {
  const campaingdata = req.body;

  const campaign = new Campaign(campaingdata);

  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT/update a campaign
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(updatedCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a campaign
router.delete("/:id", async (req, res) => {
  try {
    const removedCampaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!removedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json({ message: "Campaign deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
