import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  password: Joi.string().required().min(2).max(12),
  email: Joi.string().required().email(),
});
