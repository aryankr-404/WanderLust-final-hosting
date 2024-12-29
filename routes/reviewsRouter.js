const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview} = require("../middleware.js");
const { isLoggedIn , isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//create review
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//Delete Review
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;