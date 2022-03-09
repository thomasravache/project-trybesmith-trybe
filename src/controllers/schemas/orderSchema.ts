import Joi, { ObjectSchema } from 'joi';
import { OrderRequest } from '../../types';

const orderSchema: ObjectSchema<OrderRequest> = Joi.object({
  products: Joi.array().min(1).not().empty()
    .required()
    .messages({
      'any.required': 'Products is required',
      'array.base': 'Products must be an array of numbers',
      'array.min': 'Products can\'t be empty',
    }),
});

export default orderSchema;
