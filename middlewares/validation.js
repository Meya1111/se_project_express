const { celebrate, Joi } = require("celebrate");

const validateSignup = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignin = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateItem = celebrate({
    body: Joi.object({
      name: Joi.string().required().min(2).max(30),
      imageUrl: Joi.string().required().uri(),
      weather: Joi.string().required(),
    }),
  });
  
  const validateItemIdParam = celebrate({
    params: Joi.object({
      itemId: Joi.string().hex().length(24),
    }),
  });
  
  const validateUpdateProfile = celebrate({
    body: Joi.object({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  });

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateItem,
  validateItemIdParam,
  validateUpdateProfile,
};