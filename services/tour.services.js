const Tour = require("../models/tour.model");

exports.getTourService = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalTour = await Tour.countDocuments(filters);
  const pageCount = Math.ceil(totalTour / queries.limit);
  return { tours, totalTour, pageCount };
};

exports.trendingTourServices = async () => {
  const trendingTours = await Tour.find().sort({ views: -1 }).limit(3);
  return { trendingTours };
};
exports.cheapestTourServices = async () => {
  const trendingTours = await Tour.find().sort({ price: 1 }).limit(3);
  return { trendingTours };
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

exports.deleteTourServices = async (tourId) => {
  const result = await Tour.deleteOne({ _id: tourId });
  return result;
};
