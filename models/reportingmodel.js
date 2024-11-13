// models/Campaign.js
import mongoose from "mongoose";

const reportingSchema = new mongoose.Schema({
  campaignName: { type: String },
  adSetName: { type: String },
  ads: { type: String },
  impressionDevice: { type: String },
  placement: { type: String },
  pageID: { type: String },
  deliveryStatus: { type: String },
  deliveryLevel: { type: String },
  reach: { type: Number },
  impressions: { type: Number },
  frequency: { type: Number },
  attributionSetting: { type: String },
  resultType: { type: String },
  results: { type: Number },
  amountSpent: { type: Number },
  costPerResult: { type: Number },
  starts: { type: Date },
  ends: { type: String },
  reportingStarts: { type: Date },
  reportingEnds: { type: Date },
});

export default mongoose.model("Reporting", reportingSchema);
