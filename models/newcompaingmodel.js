import mongoose from "mongoose";

const { Schema } = mongoose;
// here is udpate
const campaignSchema = new Schema(
  {
    currentSwitch: {
      type: Boolean,
    },
    campaingname: {
      type: String,
    },
    campainglink: {
      type: String,
    },
    adname: {
      type: String,
    },
    Delivery: {
      type: String,
    },
    Bidstrategy: {
      type: String,
    },
    Budget: {
      type: Number,
    },
    Attributionsetting: {
      type: String,
    },
    Results: {
      type: Number,
    },
    Reach: {
      type: Number,
    },
    Impressions: {
      type: Number,
    },
    Costperresult: {
      type: Number,
    },
    Amountspent: {
      type: Number,
    },
    Ends: {
      type: String,
    },
    campaingImage: {
      type: String,
    },
    entryDate: {
      type: String,
    },
    lastSignificent: {
      type: String,
    },
    schedule: {
      type: String,
    },
    qualityRanking: {
      type: String,
    },
    engagementrateranking: {
      type: String,
    },
    conversionrateranking: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("NewCampaign", campaignSchema);


// usama here usmaa here
//second time is here now 