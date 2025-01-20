const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.ShowListing = async (req, res) => {
  let { id } = req.params;
  const listings = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listings) {
    req.flash("error", "Listing you requested is does not exist !");
    res.redirect("/listings");
  }
  //console.log(listings);
  res.render("./listings/show.ejs", { listings });
};

module.exports.CreatListing = async (req, res, next) => {

  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = ({url, filename});~
  
  await newlisting.save();
  req.flash("success", "New Listing Created !");
  res.redirect("/listings");
};

module.exports.EditListings = async (req, res) => {
  let { id } = req.params;
  const listings = await listing.findById(id);
  if (!listings) {
    req.flash("error", "Listing you requested is does not exist !");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listings });
};

module.exports.UpdateListings = async (req, res) => {
 let { id } = req.params;
 let uplisting= await listing.findByIdAndUpdate(id, { ...req.body.listing });
 if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  uplisting.image={url,filename};
  await uplisting.save();
}
  req.flash("success", " Listing Updated !");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListings = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted !");
  res.redirect("/listings");
};
