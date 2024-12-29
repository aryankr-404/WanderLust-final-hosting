const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {savedRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");
const wrapAsync = require('../utils/wrapAsync.js');

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl, passport.authenticate("local", 
    {failureFlash: true, failureRedirect: "/login"}),userController.login);


router.get("/logout", userController.logout);

module.exports = router;