import Joi, { ObjectSchema } from 'joi';
import { Login } from '../../types';

const loginSchema: ObjectSchema<Login> = Joi.object({
  username: Joi.not().empty().required()
    .messages({
      'any.required': 'Username is required',
    }),
  password: Joi.not().empty().required()
    .messages({
      'any.required': 'Password is required',
    }),
});

export default loginSchema;
