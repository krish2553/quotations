import Quote from "../models/Qoute.js";
import generatePDF from "../utils/generatePdf.js";
import transporter from "../config/nodeMailer.js";
import path from "path";
import fs from "fs";

export const createQuote = async (req, res) => {
  try {
    const quoteData = req.body;

    // 1. Save to MongoDB
    const savedQuote = await Quote.create(quoteData);

    // 2. Generate PDF
    const pdfPath = await generatePDF(quoteData);

    // 3. Send email
    const clientEmail = process.env.DEFAULT_RECEIVER;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: clientEmail,
      subject: "Quotation Document from Krish Cranes",
      text: "Please find the attached quotation.",
      attachments: [
        {
          filename: "quotation.pdf",
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Optional: remove the file after sending
    fs.unlinkSync(pdfPath);

    res.status(201).json({ message: "Quote saved, PDF sent." });
  } catch (error) {
    console.error("Quote creation error:", error);
    res.status(500).json({ error: error.message });
  }
};
