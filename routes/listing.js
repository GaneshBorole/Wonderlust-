const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const review = require("../models/review.js");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const {storage}=require("../cloudConfig.js")  
const upload = multer({ storage });

router
.route("/")
.get( wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validatelisting,
  wrapAsync(listingController.CreatListing)
);
//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.ShowListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validatelisting,
  wrapAsync(listingController.UpdateListings)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListings)
);

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.EditListings)
);


module.exports = router;
