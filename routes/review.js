const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { CreateReview } = require("../controllers/reviews.js");
const reviewController=require("../controllers/reviews.js");
const { destroyListings } = require("../controllers/listings.js");

// Review post route

router.post(
  "/",
  isLoggedIn,
  validateReview,

  wrapAsync(reviewController.CreateReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
