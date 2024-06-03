import express from "express";
import multer from "multer";
import exceljs from "exceljs";
import Lead from "../models/newcompaingmodel.js";
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
});

router.post("/upload-campaings", upload.single("file"), async (req, res) => {
    try {
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.load(req.file.buffer);
        const worksheet = workbook.worksheets[0];
        const leads = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                const [
                    currentSwitch,
                    campaingname,
                    campainglink,
                    adname,
                    Delivery,
                    Bidstrategy,
                    Budget,
                    Attributionsetting,
                    Results,
                    Reach,
                    Impressions,
                    Costperresult,
                    Amountspent,
                    Ends,
                    campaingImage,
                    entryDate,
                    lastSignificent,
                    schedule,
                    qualityRanking,
                    engagementrateranking,
                    conversionrateranking
                ] = row.values;
                leads.push({
                    currentSwitch,
                    campaingname,
                    campainglink,
                    adname,
                    Delivery,
                    Bidstrategy,
                    Budget,
                    Attributionsetting,
                    Results,
                    Reach,
                    Impressions,
                    Costperresult,
                    Amountspent,
                    Ends,
                    campaingImage,
                    entryDate,
                    lastSignificent,
                    schedule,
                    qualityRanking,
                    engagementrateranking,
                    conversionrateranking
                });
            }
        });
        await Lead.create(leads);
        return res.status(201).json({ message: "Campaings uploaded Successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Internal Server Error", errorMessage: error.message });
    }
});

export default router;
