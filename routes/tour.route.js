const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");
const tourViewCount = require("../middleware/tourViewConut");

router.route("/trending").get(tourController.getTrendingTour)
router.route("/cheapest").get(tourController.getCheapestTour)

router.route("/").get(tourController.getTours).post(tourController.createTour);

router
  .route("/:id")
  .get(tourViewCount, tourController.getTourDetail)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router;
