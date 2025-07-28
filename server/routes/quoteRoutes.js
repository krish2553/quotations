import express from "express";
import { createQuote } from "../controllers/quoteController.js";
import Quote from "../models/Qoute.js";

const router = express.Router();

// Route to create a new quote
router.post("/", createQuote);

// Route to get next quotation ID
router.get("/next-id", async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const fyStart = today.getMonth() >= 3 ? year : year - 1;
    const fy = `${String(fyStart).slice(2)}-${String(fyStart + 1).slice(2)}`;

    const quotes = await Quote.find({
      quotationId: { $regex: `QN-\\d{3}/${fy}$` },
    });

    let maxSequence = 0;

    quotes.forEach((quote) => {
      const match = quote.quotationId.match(/QN-(\d{3})/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > maxSequence) maxSequence = num;
      }
    });

    const nextNumber = maxSequence + 1;
    const padded = String(nextNumber).padStart(3, "0");
    const quotationId = `QN-${padded}/${fy}`;

    res.json({ quotationId });
  } catch (err) {
    console.error("Error generating quotation ID:", err);
    res.status(500).json({ error: "Failed to generate quotation ID" });
  }
});

export default router;
