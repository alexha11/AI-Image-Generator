import express from "express";
import Count from "../mongodb/models/count.js";

const router = express.Router();

// GET route to retrieve the count
router.get("/", async (req, res) => {
  try {
    let count = await Count.findOne({});
    
    // If no count is found, initialize it
    if (!count) {
      count = await Count.create({ count: 0 });
    }

    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST route to create a new count document
router.post("/", async (req, res) => {
  try {
    const { count } = req.body;
    const newCount = await Count.create({ count });

    res.status(201).json({ success: true, data: newCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT route to update the count
router.put("/", async (req, res) => {
  try {
    const { count } = req.body;
    
    // Use findOneAndUpdate with upsert: true to either update the existing count or create a new document if it doesn't exist
    const updatedCount = await Count.findOneAndUpdate(
      {}, // Match the first document (since there's only one)
      { $set: { count } }, // Update the count field
      { new: true, upsert: true } // Return the updated document and create one if it doesn't exist
    );

    res.status(200).json({ success: true, data: updatedCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
