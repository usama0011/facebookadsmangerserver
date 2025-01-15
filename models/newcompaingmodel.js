import mongoose from "mongoose";

const { Schema } = mongoose;
// here is udpate
const campaignSchema = new Schema(
  {
    currentSwitch: {
      type: Boolean,
    },
    pageID: {
      type: String,
    },
    sponsorName: {
      type: String,
    },
    sponsorImageURL: {
      type: String,
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
    },
    quoteheading: {
      type: String,
    },
    quotetext: {
      type: String,
    },
    frequency: {
      type: Number,
    },
    //Below i add new fields
    CPM: {
      type: Number,
    },
    LinksClicks: {
      type: Number,
    },
    CPC: {
      type: Number,
    },
    CTR: {
      type: Number,
    },
    clicksAll: {
      type: Number,
    },
    CTRALL: {
      type: Number,
    },
    CPCAll: {
      type: Number,
    },
    //delvieryfields
    Costperthousandcentreaccounts: {
      type: Number,
    },
    CPMCostperthousandimpressions: {
      type: Number,
    },
    //Engagement
    PageEngagement: {
      type: Number,
    },
    PostReactions: {
      type: Number,
    },
    PostComments: {
      type: Number,
    },
    PostSaves: {
      type: Number,
    },
    PostShares: {
      type: Number,
    },
    PostLinkCliks: {
      type: Number,
    },
    Postfollowslikes: {
      type: Number,
    },
    PostCPClinkClick: {
      type: Number,
    },
    // Newly added fields
    twosecondvideoplay: {
      type: Number,
    },
    costpertwosecondvideoplay: {
      type: Number,
    },
    threesecondvideoplay: {
      type: Number,
    },
    costperthreesecondvideoplay: {
      type: Number,
    },
    thruplays: {
      type: Number,
    },
    costperthruplay: {
      type: Number,
    },
    videoplaytwentyfivepercent: {
      type: Number,
    },
    videoplayfiftypercent: {
      type: Number,
    },
    videoplayseventyfivepercent: {
      type: Number,
    },
    videoplayninetyfivepercent: {
      type: Number,
    },
    videoplayhundredpercent: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("NewCampaign", campaignSchema);
