import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import newCampaingRoute from "./routes/newcompaingroute.js";
import adSetRoute from "./routes/adssetroute.js";
import AdRoute from "./routes/adsroute.js";
import TransactionRoute from "./routes/transactionroute.js";
import UploadCamapings from "./routes/Campaingsupload.js";
import ReportingRoute from "./routes/reportingroute.js";
import currentAccountRoutes from "./routes/currentaccountroute.js";
import DownloadRortingFilesRoute from "./routes/downlaodreportsroute.js";
//uss
const app = express();
dotenv.config();

try {
  await mongoose.connect(
    "mongodb+srv://usama0011:usama0011@cluster0.wsyngum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connection Successfully!!");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1); // Exit the process if unable to connect to MongoDB
}

const corsOptions = {
  origin: ["https://facebookclone-tau.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Define a simple route
app.get("/", (req, res) => {
  res.status(200).json("App Work 100% facebookadsmanger");
});

// Start router from here
app.use("/api/newcampaing", newCampaingRoute);
app.use("/api/adsset", adSetRoute);
app.use("/api/leads", UploadCamapings);
app.use("/api/reporting", ReportingRoute);
app.use("/api/ads", AdRoute);
app.use("/api/transactions", TransactionRoute);
app.use("/api/currentAccount", currentAccountRoutes); // Route for currentAccount operations
app.use("/api/reports", DownloadRortingFilesRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
