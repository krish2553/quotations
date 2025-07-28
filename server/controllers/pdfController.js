// server/controllers/generatePdf.js
import fs from "fs";
import path from "path";

import Quote from "../models/Qoute.js";
import generatePDF from "../utils/generatePDF.js";

export const generatePdfHandler = async (req, res) => {
  try {
    const pdfPath = await generatePDF(req.body); // returns file path
    const stream = fs.createReadStream(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="quotation.pdf"');

    stream.pipe(res);

    // Optional: delete file after sending
    stream.on("end", () => {
      fs.unlink(pdfPath, (err) => {
        if (err) console.error("Failed to delete PDF file:", err);
      });
    });

    stream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).send("Error streaming PDF");
    });
  } catch (err) {
    console.error("PDF Generation Error:", err);
    res.status(500).send("Failed to generate PDF");
  }
};

export const generatePdfHandler2 = async (req, res) => {
  try {
    const { quoteId } = req.body;
    if (!quoteId) {
      return res.status(400).json({ error: "quoteId is required" });
    }

    // 1. Fetch the full quote from MongoDB
    const quoteData = await Quote.findById(quoteId);
    if (!quoteData) {
      return res.status(404).json({ error: "Quote not found" });
    }

    console.log(quoteData);
    // 2. Generate the PDF
    const pdfPath = await generatePDF(quoteData);

    // 3. Stream the PDF back
    const stream = fs.createReadStream(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="quotation.pdf"');

    stream.pipe(res);

    // 4. Delete the file after streaming
    stream.on("end", () => {
      fs.unlink(pdfPath, (err) => {
        if (err) console.error("Failed to delete PDF file:", err);
      });
    });

    stream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).send("Error streaming PDF");
    });
  } catch (err) {
    console.error("PDF Generation Error:", err);
    res.status(500).send("Failed to generate PDF");
  }
};
