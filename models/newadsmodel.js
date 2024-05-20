import mongoose from "mongoose";

const { Schema } = mongoose;

const adsSchema = new Schema(
    {
        currentSwitch: {
            type: Boolean,
        },
        Adname: {
            type: String,
        },
        Delivery: {
            type: String,
        },
        AdsetName: {
            type: String,
        },
        Bidstrategy: {
            type: String,
        },
        Budget: {
            type: String,
        },
        Lastsignificantedit: {
            type: String,
        },
        Attributionsetting: {
            type: String,
        },
        results: {
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
        QualityRanking: {
            type: String,
        },
        EngagementRateRanking: {
            type: String,
        },
        ConversionRateRanking: {
            type: String,
        },
        Amountspent: {
            type: String,
        },
        Ends: {
            type: String,
        },
        adImage: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Ads", adsSchema);
