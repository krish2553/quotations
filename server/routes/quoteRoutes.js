import express from "express";
import { createQuote } from "../controllers/quoteController.js";
import Quote from "../models/Qoute.js";
import Client from "../models/Client.js";
import { generatePdfHandler2 } from "../controllers/pdfController.js";

const router = express.Router();
// Route to create a new quote
router.post("/", createQuote);

router.get("/generate-pdf-by-id", generatePdfHandler2);

// Delete Quote
router.delete("/:id", async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json({ success: true, message: "Quote deleted successfully" });
  } catch (err) {
    console.error("Delete quote error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get next quotation ID
router.get("/next-id", async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const fyStart = today.getMonth() >= 3 ? year : year - 1;
    const fy = `${String(fyStart)}-${String(fyStart + 1).slice(2)}`;

    const quotes = await Quote.find({
      quotationId: { $regex: `^QTN/${fy}/\\d{3}$` },
    });

    let maxSequence = 0;

    quotes.forEach((quote) => {
      const match = quote.quotationId.match(/QTN\/\d{4}-\d{2}\/(\d{3})/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > maxSequence) maxSequence = num;
      }
    });

    const nextNumber = maxSequence + 1;
    const padded = String(nextNumber).padStart(3, "0");
    const quotationId = `QTN/${fy}/${padded}`;

    res.json({ quotationId });
  } catch (err) {
    console.error("Error generating quotation ID:", err);
    res.status(500).json({ error: "Failed to generate quotation ID" });
  }
});

// **Updated Route to get only the total number of quotes**
router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalQuotes = await Quote.countDocuments();
    const totalClients = await Client.countDocuments();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const monthlyQuoteCount = await Quote.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const yearlyQuoteCount = await Quote.countDocuments({
      createdAt: { $gte: startOfYear },
    });

    // Build monthlyCounts for April–March
    const monthlyCounts = {
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
      Jan: 0,
      Feb: 0,
      Mar: 0,
    };

    const fyStartYear =
      now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
    const fyStartDate = new Date(fyStartYear, 3, 1); // April 1
    const fyEndDate = new Date(fyStartYear + 1, 2, 31, 23, 59, 59); // March 31

    const fyQuotes = await Quote.find({
      createdAt: { $gte: fyStartDate, $lte: fyEndDate },
    });

    const monthMap = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    fyQuotes.forEach((quote) => {
      const createdAt = new Date(quote.createdAt);
      const month = monthMap[createdAt.getMonth()];
      if (monthlyCounts.hasOwnProperty(month)) {
        monthlyCounts[month]++;
      }
    });

    res.json({
      success: true,
      data: {
        totalQuotes,
        totalClients,
        monthlyQuoteCount,
        yearlyQuoteCount,
        monthlyCounts,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/by-period", async (req, res) => {
  try {
    const { filter = "all" } = req.query;
    let startDate = null;

    const now = new Date();

    if (filter === "monthly") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of current month
    } else if (filter === "yearly") {
      startDate = new Date(now.getFullYear(), 0, 1); // Start of current year
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {}; // If filter is 'all', no time constraint

    const quotes = await Quote.find(query).sort({ createdAt: -1 });

    res.json({ success: true, quotes });
  } catch (error) {
    console.error("Error fetching filtered quotes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
