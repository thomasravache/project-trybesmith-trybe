import Joi, { ObjectSchema } from 'joi';
import { User } from '../../types';

const userSchema: ObjectSchema<User> = Joi.object({
  username: Joi.string().min(3).not().empty()
    .required()
    .messages({
      'any.required': 'Username is required',
      'string.base': 'Username must be a string',
      'string.min': 'Username must be longer than 2 characters',
    }),
  classe: Joi.string().min(3).not().empty()
    .required()
    .messages({
      'any.required': 'Classe is required',
      'string.base': 'Classe must be a string',
      'string.min': 'Classe must be longer than 2 characters',
    }),
  level: Joi.number().strict().min(1).not()
    .empty()
    .required()
    .messages({
      'any.required': 'Level is required',
      'number.base': 'Level must be a number',
      'number.min': 'Level must be greater than 0',
    }),
  password: Joi.string().min(8).not().empty()
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.base': 'Password must be a string',
      'string.min': 'Password must be longer than 7 characters',
    }),
});

export default userSchema;
