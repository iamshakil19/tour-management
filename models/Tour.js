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
  },
  {
    timestamps: true,
  }
);

tourSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
