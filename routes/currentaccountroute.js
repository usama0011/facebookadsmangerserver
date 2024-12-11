import express from "express";
import mongoose from "mongoose";
import CurrentAccount from "../models/currentaccount.js"; // Adjust path if needed

const router = express.Router();

// Get all accounts
router.get("/", async (req, res) => {
  try {
    const accounts = await CurrentAccount.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single account by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid ID format" });

  try {
    const account = await CurrentAccount.findById(id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new account
router.post("/", async (req, res) => {
  const { currentAccountname, mainAccountname, mainAccountImage } = req.body;

  try {
    const newAccount = new CurrentAccount({
      currentAccountname,
      mainAccountname,
      mainAccountImage,
    });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing account by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedata = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid ID format" });

  try {
    // Pass the data directly instead of wrapping it in an object
    const updatedAccount = await CurrentAccount.findByIdAndUpdate(
      id,
      updatedata, // Use updatedata directly
      { new: true, runValidators: true }
    );
    if (!updatedAccount)
      return res.status(404).json({ message: "Account not found" });
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an account by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid ID format" });

  try {
    const deletedAccount = await CurrentAccount.findByIdAndDelete(id);
    if (!deletedAccount)
      return res.status(404).json({ message: "Account not found" });
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
