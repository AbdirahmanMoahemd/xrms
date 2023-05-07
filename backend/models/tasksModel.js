import mongoose from "mongoose";

const tasksSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
    custID: {
      type: Number,
      require: true,
      default:1
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      require: true,
    }, 
    phone: {
      type: Number,
      require: true,
    },
    item: {
      type: String,
      require: true,
    },
    bin: {
        type: Boolean,
        required: true,
        default: false,
      },
    problem: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
    },
    amount: {
      type: Number,
      require: true,
    },
    stage: {
      type: Number,
      require: true,
      default: 0,
    },
    review: {
      type: String,
    },
    comment: {
      type: String,
      require: true,
      default: 'No Comment yet.'
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("tasks", tasksSchema);

export default Tasks;
