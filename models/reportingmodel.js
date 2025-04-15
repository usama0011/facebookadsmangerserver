import mongoose from "mongoose";

const reportingSchema = new mongoose.Schema({
  "Page ID": { type: String, required: false },
  "Entry Date": { type: String, required: false },
  "Page Name": { type: String, required: false },
  "Campaign Name": { type: String, required: false },
  "Ad Set Name": { type: String, required: false },
  "Ad Name": { type: String, required: false },
  "Ad Creative": { type: String, required: false },
  "Impression Device": { type: String, required: false },
  Placement: { type: String, required: false },
  "Amount Spent": { type: String, required: false },
  Impressions: { type: Number, required: false },
  Reach: { type: Number, required: false },
  Results: { type: Number, required: false },
  "Link Clicks": { type: Number, required: false },
  "Cost per result": { type: String, required: false },
  Delivery: { type: String, required: false },
  Frequency: { type: Number, required: false },
  "CPC (cost per link click)": { type: String, required: false },
  "CPM (cost per 1,000 impressions)": { type: String, required: false },
  "CTR (all)": { type: String, required: false },
  "Result rate": { type: String, required: false },
  "Clicks (all)": { type: Number, required: false },
  "CPC (all)": { type: String, required: false },
});

export default mongoose.model("Reporting", reportingSchema);
