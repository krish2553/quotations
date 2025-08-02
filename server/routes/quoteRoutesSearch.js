import express from "express";
import Quote from "../models/Qoute.js";

const router = express.Router();

// GET /api/quoteSearch?search=&sortKey=&sortOrder=&page=&limit=&minLoad=&maxLoad=&startDate=&endDate=
router.get("/", async (req, res) => {
  try {
    const search = req.query.search?.trim() || "";
    const minLoad = parseFloat(req.query.minLoad);
    const maxLoad = parseFloat(req.query.maxLoad);
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;
    const sortKey = req.query.sortKey || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const regex = new RegExp(search, "i");

    const allQuotes = await Quote.find({
      $or: [
        { "client.name": { $regex: regex } },
        { quotationId: { $regex: regex } },
        {
          "annexure1.bayAreas": {
            $elemMatch: {
              cranes: {
                $elemMatch: {
                  mainHoist: {
                    $elemMatch: {
                      0: { $regex: /load/i },
                      1: { $regex: regex },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    });

    const filtered = allQuotes.filter((quote) => {
      let totalCranes = 0;
      let hasMatchingLoad = false;

      if (!quote?.annexure1?.bayAreas?.length) return false;

      // Filter by load
      for (const bay of quote.annexure1.bayAreas) {
        for (const crane of bay?.cranes || []) {
          totalCranes++;

          const loadEntry = crane.mainHoist?.find(
            (entry) =>
              Array.isArray(entry) &&
              entry[0]?.toLowerCase?.() === "load" &&
              typeof entry[1] === "string"
          );

          if (loadEntry) {
            const numericValue = parseFloat(
              loadEntry[1].replace(/[^\d.]/g, "")
            );
            if (
              (!isNaN(minLoad) && numericValue < minLoad) ||
              (!isNaN(maxLoad) && numericValue > maxLoad)
            ) {
              continue;
            }
            hasMatchingLoad = true;
          }
        }
      }

      const matchesSearch = search
        ? quote.client?.name?.match(regex) ||
          quote.quotationId?.match(regex) ||
          totalCranes.toString().includes(search) ||
          hasMatchingLoad
        : true;

      const passesLoadFilter =
        isNaN(minLoad) && isNaN(maxLoad) ? true : hasMatchingLoad;

      const passesDateFilter =
        (!startDate || new Date(quote.createdAt) >= startDate) &&
        (!endDate || new Date(quote.createdAt) <= endDate);

      return matchesSearch && passesLoadFilter && passesDateFilter;
    });

    // Sort and paginate
    const sorted = filtered.sort((a, b) => {
      const aVal =
        sortKey === "client.name" ? a.client?.name || "" : a[sortKey] || "";
      const bVal =
        sortKey === "client.name" ? b.client?.name || "" : b[sortKey] || "";

      return sortOrder === 1
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    const paginated = sorted.slice(skip, skip + limit);
    const totalPages = Math.ceil(filtered.length / limit);

    res.json({
      quotes: paginated,
      totalPages,
    });
  } catch (err) {
    console.error("Quote search error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
