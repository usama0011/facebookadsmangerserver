import mongoose from "mongoose";

const reportingSchema = new mongoose.Schema({
  campaignName: { type: String },
  adSetName: { type: String },
  placement: { type: String },
  impressionDevice: { type: String },
  pageId: { type: String },
});

export default mongoose.model("Reporting", reportingSchema);
