const listing = require("./models/listing");

const ExpressError = require("./utils/ExpressError.js");
const { listeningSchema,reviewSchema } = require("./schema.js");
const Review = require("./models/review");



module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){    
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","You must be Logged in to Create Listing");
         return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listings = await listing.findById(id);
    if (!listings.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have Access");
      return res.redirect(`/listings/${id}`);
    }
    next();
  };
  

  module.exports.validatelisting = (req, res, next) => {
    let { error } = listeningSchema.validate(req.body);
  
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

  module.exports. validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    
      if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
      }else{
        next();
      }
      
    
  };

  
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id,reviewId } = req.params;
  let review= await Review.findById(reviewId);
  if (! review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have Access");
    return res.redirect(`/listings/${id}`);
  }
  next();
};