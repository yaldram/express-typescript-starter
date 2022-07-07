import { Request, Response, NextFunction } from 'express';

export function asyncHandler(controllerFunction: any) {
  return function asyncMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const controllerPromise = controllerFunction(req, res, next);
    return Promise.resolve(controllerPromise).catch(next);
  };
}
