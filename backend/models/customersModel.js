import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    custID: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
    },
    tasks: [
      {
        task: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tasks",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Customers = mongoose.model("customers", customerSchema);

export default Customers;
