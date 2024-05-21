import mongoose from "mongoose";

const { Schema } = mongoose;

const adsSetSchema = new Schema(
    {

        currentSwitch: {
            type: Boolean,
        },
        AdsSetname: {
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
        Amountspent: {
            type: String,
        },
        Ends: {
            type: String,
        },
        Schedule: {
            type: String,
        },
        adssetImage: {
            type: String,
        },
        entryDate: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model("NewAdsSet", adsSetSchema);
