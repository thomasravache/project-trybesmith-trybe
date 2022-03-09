import { DomainError, StatusCodes } from '../types';

const generatedError = (message: string, statusCode: StatusCodes): DomainError => {
  const error: DomainError = {
    name: 'Erro de domínio',
    domain: true,
    message,
    code: statusCode,
  };

  return error;
};

export default generatedError;
