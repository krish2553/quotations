import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactPerson: String,
  address: [String], // Address line 1 to 4
});

export default mongoose.model("Client", ClientSchema);
