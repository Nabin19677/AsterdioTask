import mongoose from "mongoose";

const { Schema } = mongoose;

const LinkSchema = new Schema(
  {
    linkAddress: {
      type: String,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
  },
  { _id: false }
);

const Category = new Schema({
  name: {
    type: String,
    required: true,
  },
  links: [LinkSchema],
  salesPerson: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "SalesPerson",
  },
});

export default mongoose.model("Category", Category);
