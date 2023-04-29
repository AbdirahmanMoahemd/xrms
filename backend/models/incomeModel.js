import mongoose from "mongoose";

const incomeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    type: {
        type: String,
        require: true,
      },
    date: {
      type: Date,
      require: true,
    },
    ref: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Income = mongoose.model("income", incomeSchema);

export default Income;
