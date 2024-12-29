const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listingsRouter.js");
const reviewsRouter = require("./routes/reviewsRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const searchRouter = require("./routes/searchRouter.js");
const myBookingsRouter = require("./routes/myBookingsRouter.js");

const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static("public"));
app.use(cookieParser());

const db_URL = "mongodb://localhost:27017/wanderlust";
const mongo_atlas_url = process.env.ATLAS_DB_URL; 

main().then(() => {
    console.log('Database connected');
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongo_atlas_url);
};

const store = MongoStore.create({
    mongoUrl : mongo_atlas_url,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600  // 1 day 
});

store.on("error", ()=>{
    console.log("Error in mongo store", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,  // 7 days from now
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
};



//Root route
// app.get('/', (req, res) => {
//     res.send("root route");
// });

app.use(session(sessionOptions));
app.use(flash());

// Using Passport package
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;  // current user is stored in req.user by passport.session() middleware
    next();
});

app.get("/demouser", async(req, res) => {
    let fakeuser = new User({
        username: "demouser",
        email: "student@gmail.com",
    });
    let registeredUser = await User.register(fakeuser, "helloworld");
    res.send(registeredUser);
});

//Listings route
app.use("/listings", listingsRouter);
//Review  route
app.use("/listings/:id/reviews", reviewsRouter);
// User route
app.use("/", usersRouter);
// Search route
app.use("/search", searchRouter);

//myBookings route
app.use("/myBookings", myBookingsRouter);





// if request is received at some other route
app.all("*", (req,res,next)=>{
    next(new ExpressError(404, "Page Not found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("Server listening on port 8080");
})