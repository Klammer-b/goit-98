import Joi from 'joi';

export const validateGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
