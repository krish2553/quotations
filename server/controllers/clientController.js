import Client from "../models/Client.js";

// @desc    Create a new client
// @route   POST /api/clients
// @access  Public
const createClient = async (req, res) => {
  const { name, contactPerson, address, subject, reference } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Client name is required",
    });
  }

  try {
    const newClient = new Client({
      name,
      contactPerson,
      address,
      subject,
      reference,
    });

    const savedClient = await newClient.save();

    res.status(201).json({
      success: true,
      client: savedClient,
      message: "Client created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { createClient };
