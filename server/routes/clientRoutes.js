import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// Create new client
router.post("/", async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search clients
router.get("/", async (req, res) => {
  try {
    const search = req.query.q || "";
    const regex = new RegExp(search, "i");
    const clients = await Client.find({ name: regex });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;