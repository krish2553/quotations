import mongoose from "mongoose";

const Schema = mongoose.Schema;

// ========== Sub-Schemas ==========

// Sub-schema for table-like [["Label", "Value"]] format
const TableSchema = {
  type: [[String]],
  default: [],
};

// Crane Sub-Schema (Annexure 1)
const CraneSchema = new Schema(
  {
    name: String,
    references: TableSchema,
    generalInfo: TableSchema,
    craneGroups: TableSchema,
    bridge: TableSchema,
    mainHoist: TableSchema,
    auxHoist: TableSchema, // ✅ Added
    crossTraversing: TableSchema,
    longTravelling: TableSchema,
    powerSupply: TableSchema,
    weights: TableSchema,
    componentMainHoist: TableSchema,
    componentAuxHoist: TableSchema, // ✅ Added
    componentTrolley: TableSchema,
    componentBridge: TableSchema,
  },
  { _id: false }
);

// Bay Area Sub-Schema (Annexure 1 + 4)
const BayAreaSchema = new Schema(
  {
    name: String,
    cranes: [CraneSchema],
    length: String, // optional, for annexure4
    dsl: String, // optional, for annexure4
  },
  { _id: false }
);

// Component (Annexure 1 – Crane Components)
const ComponentSchema = new Schema(
  {
    name: String,
    description: String,
    image: String,
  },
  { _id: false }
);

// Make of Bought-Out Items (Annexure 3)
const Annexure3Schema = new Schema(
  {
    mechanical: TableSchema,
    electrical: TableSchema,
    controlSafety: TableSchema,
  },
  { _id: false }
);

// Crane Price Entry Schema (Annexure 4)
const CranePriceSchema = new Schema(
  {
    description: String,
    qty: Number,
    unitPrice: Number,
  },
  { _id: false }
);

// Annexure 4 Pricing Schema
const PriceAnnexureSchema = new Schema(
  {
    bayAreas: [BayAreaSchema],
    transport: {
      unit: Number,
    },
    load: {
      unit: Number,
    },
    cranePrices: {
      type: Map,
      of: [CranePriceSchema],
    },
    other: [
      {
        label: String,
        unit: Number,
      },
    ],
  },
  { _id: false }
);

// ========== Main Quote Schema ==========

const QuoteSchema = new Schema(
  {
    quotationId: String,
    date: String,
    client: {
      name: String,
      contactPerson: String,
      subject: String,
      reference: String,
      address: [String],
      kindAttention: String,
    },
    annexure1: {
      bayAreas: [BayAreaSchema],
      craneComponents: [ComponentSchema],
      craneComponentNames: [String],
    },
    annexure2: {
      krishCraneScope: String,
      buyerScope: String,
    },
    annexure3: Annexure3Schema,
    annexure4: PriceAnnexureSchema,
    annexure5: {
      type: Schema.Types.Mixed, // Optional structure
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", QuoteSchema);
