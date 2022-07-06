import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
