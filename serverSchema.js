const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title : Joi.string().required(),
    description :Joi.string().required(),
    location :Joi.string().required(),
    country :Joi.string().required(),
    price :Joi.number().min(0),
    image : Joi.string().allow("",null),
});

module.exports.reviewSchema = Joi.object({
    comment : Joi.string().required(),
    rating :Joi.number().required().min(1).max(5),   
});