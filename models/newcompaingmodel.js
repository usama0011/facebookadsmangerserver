import mongoose from "mongoose";

const { Schema } = mongoose;

const campaignSchema = new Schema(
  {

    currentSwitch: {
      type: Boolean,
    },
    campaingname: {
      type: String,
    },
    Delivery: {
      type: String,
    },
    Bidstrategy: {
      type: String,
    },
    Budget: {
      type: String,
    },
    Attributionsetting: {
      type: String,
    },
    Results: {
      type: String,
    },
    Reach: {
      type: String,
    },
    Impressions: {
      type: String,
    },
    Costperresult: {
      type: String,
    },
    Amountspent: {
      type: String,
    },
    Ends: {
      type: String,
    },
    campaingImage: {
      type: String,
    },
    entryDate: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("NewCampaign", campaignSchema);
