const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this tour package"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    seat: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      require: [true, "Please provide tour package days"],
    },
    country: {
      type: String,
      required: true,
      enum: {
        values: ["bangladesh", "india", "pakistan"],
        message: "country value can't be {VALUE}",
      },
    },
    image: {
      type: String,
      required: [true, "A tour must have images"],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
