import { ObjectSchema } from 'joi';

const validateSchema = <T>(joiSchema: ObjectSchema<T>, body: T): void => {
  const { error } = joiSchema.validate(body);

  if (error) throw error;
};

export default validateSchema;
