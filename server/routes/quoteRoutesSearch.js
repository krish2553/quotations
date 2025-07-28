import express from "express";
import Quote from "../models/Qoute.js";

const router = express.Router();

// GET /api/quotes?search=xyz&sortKey=name&sortOrder=asc&page=1&limit=25
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const sortKey = req.query.sortKey || "date";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const regex = new RegExp(search, "i");

    const query = {
      "client.name": { $regex: regex },
    };

    const totalCount = await Quote.countDocuments(query);

    const quotes = await Quote.find(query)
      .sort({ [sortKey]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({ quotes, totalPages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
