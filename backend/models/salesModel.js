import mongoose from "mongoose";

const salesSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
          ref: "customers",
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    date: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("sales", salesSchema);

export default Sales;
