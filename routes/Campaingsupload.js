import express from "express";
import Lead from "../models/newcompaingmodel.js";
const router = express.Router();
import { Stream } from "stream"; // Use import for ES6 modules
import multer from "multer";
import csv from "csv-parser";
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
});

router.post(
    "/singlefile/upload",
    upload.single("file"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res
                    .status(400)
                    .json({ success: false, message: "No file uploaded" });
            }

            const results = [];
            const fileBuffer = req.file.buffer.toString("utf8");
            const readableStream = Stream.Readable.from(fileBuffer.split("\n"));
            const csvParser = csv();

            await new Promise((resolve, reject) => {
                readableStream
                    .pipe(csvParser)
                    .on("data", (data) => {
                        results.push(data);
                        console.log(data);
                    })
                    .on("end", resolve)
                    .on("error", reject);
            });

            await Lead.insertMany(results);

            res.status(200).json({
                success: true,
                message: "Camapings data successfully uploaded",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error processing file or saving data to Camapings model",
                errormsg: error.message,
            });
        }
    }
);

export default router;