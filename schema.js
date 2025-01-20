const Joi = require('joi');
const listing = require('./models/listing');

module.exports.listeningSchema=Joi.object({
    listing :Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image: Joi.string().uri().optional(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required(),

    })
});


module.exports.reviewSchema =Joi.object({
    review:Joi.object({
      rating:Joi.number().required().min(1).max(5),
      comment:Joi.string().required(),
    }).required(),
});