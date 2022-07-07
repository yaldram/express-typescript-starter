import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  status: number;
  validationErrors: unknown;

  constructor(message: string, status: number, validationErrors: unknown) {
    super(message);
    this.status = status;
    this.validationErrors = validationErrors;
  }
}
