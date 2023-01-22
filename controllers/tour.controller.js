const {
  getTourService,
  createTourServices,
  updateTourServices,
  getTourDetailService,
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

exports.tourDetail = async (req, res, next) => {
  try {
    const {id} = req.params
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
    console.log(req.body);
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
