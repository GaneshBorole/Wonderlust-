const Review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.CreateReview = async (req, res) => {
  let { id } = req.params;

  let list = await listing.findById(id);

  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  list.reviews.push(newReview);

  await newReview.save();
  await list.save();
  req.flash("success", "Review Created !");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review is  Deleted !");
  res.redirect(`/listings/${id}`);
};
