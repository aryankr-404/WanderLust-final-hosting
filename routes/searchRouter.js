const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");

router.get("/", async(req,res)=>{
    const {searchLocation} = req.query;
    if (!searchLocation) {
        req.flash('error','Please enter a country name');
        return res.redirect('/listings');
    }
    const regex = new RegExp(searchLocation, 'i');
    let searchedListings = await Listing.find({location : regex});
    if(searchedListings.length == 0){
         searchedListings = await Listing.find({country : regex});
    }
    res.render("listings/desinationSearch.ejs",{searchedListings,searchLocation});

});

module.exports = router;