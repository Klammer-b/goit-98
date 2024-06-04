import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().required().min(2).max(20).messages({
    'any.required': '{{#label}} Is Required',
    'string.min': 'Min string length is not achieved. {{#limit}} required',
    'string.max': 'Max string length is not achieved',
  }),
  age: Joi.number().integer().required().min(6).max(18),
  gender: Joi.string().required().valid('male', 'female', 'other'),
  avgMark: Joi.number().required().min(1).max(12).messages({
    'number.base': 'Must be a number',
    'number.min': 'Min number is not achieved. {{#limit}} required',
    'number.max': 'Max number is not achieved',
  }),
  onDuty: Joi.boolean(),
});
