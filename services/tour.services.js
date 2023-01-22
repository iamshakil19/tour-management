const Tour = require("../models/tour.model");

exports.getTourService = async () => {
  const tours = await Tour.find();
  return { tours };
};

exports.getTourDetailService = async (id) => {
  const result = await Tour.findById(id);
  return result;
};

exports.createTourServices = async (data) => {
  const tour = await Tour.create(data);
  return { tour };
};

exports.updateTourServices = async (tourId, data) => {
  const result = await Tour.updateOne(
    { _id: tourId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};
