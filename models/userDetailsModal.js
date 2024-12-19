const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    donationAmount: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    mobile: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "is invalid"],
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "is invalid"],
    },
    notify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", DonationSchema);
