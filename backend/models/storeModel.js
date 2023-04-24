import mongoose from "mongoose";

const storeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      require: true,
    },
    selling: {
      type: Number,
      require: true,
    },
    cost: {
      type: Number,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("store", storeSchema);

export default Store;
