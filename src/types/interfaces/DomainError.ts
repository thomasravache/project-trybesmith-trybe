import StatusCodes from '../enums/statusCodes';

interface DomainError extends Error {
  domain: boolean,
  message: string,
  code: StatusCodes
}

export default DomainError;
