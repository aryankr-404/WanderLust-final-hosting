const Listing = require("../models/listing.js");

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path : "reviews", populate : {path : "author"}}) //nested populate
    .populate("owner");
    if(!listing){
       req.flash("error","Listing not found");
       res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async(req,res)=>{
    // const {title, description, image, price, country, location} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success","Listing created successfully!!");
    res.redirect("/listings");
};

module.exports.editListing = async(req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);

    if(!listing){
       req.flash("error","Listing not found");
       res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    let lowResolutionUrl = originalUrl.replace("/upload", "/upload/w_200");
    res.render("listings/edit.ejs",{listing ,lowResolutionUrl});
 };

 module.exports.updateListing = async(req, res) => {
    const {id} = req.params;
    if(!req.body){
        throw new ExpressError(400,"Enter valid data for listing");
    }
    const updatedData = req.body;
    const updatedlisting = await Listing.findByIdAndUpdate(id,updatedData);
    if(typeof req.file !== "undefined"){ //if new file is not uploaded by user then this code with take action
        let url = req.file.path;
        let filename = req.file.filename;
        updatedlisting.image = {url, filename};
        await updatedlisting.save();
    }
    req.flash("success","Listing Updated successfully");
    res.redirect(`/listings/${id}`);  
 };

 module.exports.destroyListing = async(req, res)=>{
    const {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted successfully");
    res.redirect("/listings");
  };

module.exports.renderBookingForm = async(req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/booking.ejs",{listing});
};

module.exports.bookListing = async(req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    const user = req.user;
    // Add the listing to the user's bookings
    user.bookings.push(listing._id);
    await user.save();
    res.redirect("/listings");
}

