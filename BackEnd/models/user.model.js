const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    workplace: { type: String, required: true },
    balance: { type: Number, required: true },
    spendlimit: { type: Number, required: true },
    income: { type: Number, required: true },
    expenses: [
      {
        caption: String,
        amount: Number,
        date: Date,
        location: String,
        field: String
      }
    ],
    fields: [String],
    locations: [String],
    yearly: [{ year: Number, Ybalance: Number }],
    monthly: [{ month: String, Mbalance: Number }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
