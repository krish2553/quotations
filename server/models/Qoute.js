import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Accept arrays like [["Label", "Value"], ...]
const TableSchema = [[String]];

// Crane Schema
const CraneSchema = new Schema(
  {
    name: String,
    references: TableSchema,
    generalInfo: TableSchema,
    craneGroups: TableSchema,
    bridge: TableSchema,
    mainHoist: TableSchema,
    crossTraversing: TableSchema,
    longTravelling: TableSchema,
    powerSupply: TableSchema,
    weights: TableSchema,
    componentMainHoist: TableSchema,
    componentTrolley: TableSchema,
    componentBridge: TableSchema,
  },
  { _id: false }
);

// Bay Area Schema (Annexure 1 + 4)
const BayAreaSchema = new Schema(
  {
    name: String,
    cranes: [CraneSchema],
    length: String, // for annexure4
    dsl: String, // for annexure4
    qty1: Number,
    unit1: Number,
    qty2: Number,
    unit2: Number,
    qty3: Number,
    unit3: Number,
    qty4: Number,
    unit4: Number,
  },
  { _id: false }
);

// Crane Component (Annexure 1 – Crane Components)
const ComponentSchema = new Schema(
  {
    name: String,
    description: String,
    image: String,
  },
  { _id: false }
);

// Make of Bought-Out Items (Annexure 3)
const BoughtOutItemSchema = new Schema(
  {
    srNo: String,
    itemDescription: String,
    vendor: String,
    specOrCapacity: String, // optional
  },
  { _id: false }
);

const Annexure3Schema = new Schema(
  {
    mechanical: [[String]],
    electrical: [[String]],
    controlSafety: [[String]],
  },
  { _id: false }
);

// Annexure 4 extras
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
      of: [
        {
          description: String,
          qty: Number,
          unitPrice: Number,
        },
      ],
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

// Quote Schema
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
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", QuoteSchema);
