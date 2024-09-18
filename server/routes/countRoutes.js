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

router.patch('/', async (req, res) => {
  const { count } = req.body;

  // Basic validation to check if 'count' is provided and is a number
  if (typeof count !== 'number') {
    return res.status(400).send({ error: 'Invalid count value' });
  }

  try {
    // Replace this with your actual logic to update the count in the database
    await updateCountInDatabase(count); // Example: await db.update({ count });
    
    // Send a success response with the updated count
    res.status(200).send({ success: true, count });
  } catch (error) {
    console.error('Error updating count:', error);
    
    // Send a 500 response in case of any internal server errors
    res.status(500).send({ error: 'Failed to update count' });
  }
});




export default router;
