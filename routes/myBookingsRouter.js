const express = require('express');
const router = express.Router();
const { isLoggedIn } = require("../middleware.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");


//My Bookings
router.get("/",isLoggedIn, async(req,res)=>{
    const user = req.user;
    const populatedUser = await User.findById(user._id).populate('bookings');
    const bookedListings = populatedUser.bookings;
    res.render("listings/myBookings.ejs", { user, bookedListings });
});


    
    
    


module.exports = router;