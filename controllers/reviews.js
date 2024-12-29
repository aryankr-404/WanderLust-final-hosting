const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review Added");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async(req, res) => {
    const {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});//removing review from review array
    await Review.findByIdAndDelete(reviewId); //deleting the review
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};