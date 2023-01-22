const { isValidObjectId } = require("mongoose");
const {
  getTourService,
  createTourServices,
  updateTourServices,
  getTourDetailService,
  deleteTourServices,
  trendingTourServices,
} = require("../services/tour.services");

exports.getTours = async (req, res, next) => {
  try {
    const tours = await getTourService();

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
