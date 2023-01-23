const { isValidObjectId } = require("mongoose");
const {
  getTourService,
  createTourServices,
  updateTourServices,
  getTourDetailService,
  deleteTourServices,
  trendingTourServices,
  cheapestTourServices,
} = require("../services/tour.services");

exports.getTours = async (req, res, next) => {
  try {

    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if(req.query.page) {
      const {page = 1, limit = 2} = req.query;
      const skip = (page - 1) * Number(limit);
      queries.skip = skip
      queries.limit = Number(limit)
    }

    const tours = await getTourService(filters, queries);
    res.status(200).send({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getTourDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id." });
    }
    const tour = await getTourDetailService(id);

    res.status(200).send({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const result = await createTourServices(req.body);

    res.status(200).send({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "data is not inserted",
      error: error.message,
    });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id." });
    }

    const result = await updateTourServices(id, req.body);

    res.status(200).send({
      status: "success",
      message: "Successfully update the tour",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "could't update the product",
      error: error.message,
    });
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id." });
    }
    const result = await deleteTourServices(id);
    if (!result.deletedCount) {
      return res.status(400).send({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }

    res.status(200).send({
      status: "success",
      message: "Tour delete successfully",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "couldn't delete the tour",
      error: error.message,
    });
  }
};

exports.getTrendingTour = async (req, res) => {
  try {
    const trendingTours = await trendingTourServices();

    res.status(200).send({
      status: "success",
      data: trendingTours,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.getCheapestTour = async (req, res) => {
  try {
    const cheapestTour = await cheapestTourServices();

    res.status(200).send({
      status: "success",
      data: cheapestTour,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};
