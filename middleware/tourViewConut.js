const { getTourDetailService } = require("../services/tour.services");

const tourViewCount = async (req, res) => {
  const { id } = req.params;
  const tour = await getTourDetailService(id);
  if (!tour) {
    res.status(404).send({
      success: false,
      message: "Tour not found",
    });
  }
  tour.views += 1;
  await tour.save();
  res.status(200).send({
    success: true,
    data: tour,
  });
};

module.exports = tourViewCount;
