import Joi, { ObjectSchema } from 'joi';
import { Product } from '../../types';

const productSchema: ObjectSchema<Product> = Joi.object({
  name: Joi.string().min(3).not().empty()
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.base': 'Name must be a string',
      'string.min': 'Name must be longer than 2 characters',
    }),
  amount: Joi.string().min(3).not().empty()
    .required()
    .messages({
      'any.required': 'Amount is required',
      'string.base': 'Amount must be a string',
      'string.min': 'Amount must be longer than 2 characters',
    }),
});

export default productSchema;
