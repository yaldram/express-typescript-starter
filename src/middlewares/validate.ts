import { Request, RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ZodSchema, ZodTypeDef, ZodType, z } from 'zod';

import { ValidationError } from '../utils/ValidationError';

export type TypedRequestBody<TBody extends ZodType<any, ZodTypeDef, any>> =
  Request<ParamsDictionary, any, z.infer<TBody>, any>;

export type TypedRequestParams<TParams extends ZodType<any, ZodTypeDef, any>> =
  Request<z.infer<TParams>, any, any, any>;

export type TypedRequestQuery<TQuery extends ZodType<any, ZodTypeDef, any>> =
  Request<ParamsDictionary, any, any, z.infer<TQuery>>;

export const validateRequestBody: <TBody>(
  zodSchema: ZodSchema<TBody>
) => RequestHandler<ParamsDictionary, any, TBody, any> =
  (schema) => (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (parsed.success) {
      return next();
    } else {
      const { fieldErrors } = parsed.error.flatten();
      const error = new ValidationError('error validating request body', 422, [
        { type: 'Body', errors: fieldErrors },
      ]);
      throw error;
    }
  };

export const validateRequestParams: <TParams>(
  zodSchema: ZodSchema<TParams>
) => RequestHandler<TParams, any, any, any> = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.params);
  if (parsed.success) {
    return next();
  } else {
    const { fieldErrors } = parsed.error.flatten();
    const error = new ValidationError('error validating request params', 422, [
      { type: 'Params', errors: fieldErrors },
    ]);
    throw error;
  }
};

export const validateRequestQuery: <TQuery>(
  zodSchema: ZodSchema<TQuery>
) => RequestHandler<ParamsDictionary, any, any, TQuery> =
  (schema) => (req, res, next) => {
    const parsed = schema.safeParse(req.query);
    if (parsed.success) {
      return next();
    } else {
      const { fieldErrors } = parsed.error.flatten();
      const error = new ValidationError(
        'error validating request query params',
        422,
        [{ type: 'Query', errors: fieldErrors }]
      );
      throw error;
    }
  };

export type RequestValidation<TParams, TQuery, TBody> = {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  body?: ZodSchema<TBody>;
};

export const validateRequest: <TParams = any, TQuery = any, TBody = any>(
  schemas: RequestValidation<TParams, TQuery, TBody>
) => RequestHandler<TParams, any, TBody, TQuery> =
  ({ params, query, body }) =>
  (req, res, next) => {
    const errors = [];
    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) {
        errors.push({
          type: 'Params',
          errors: parsed.error.flatten().fieldErrors,
        });
      }
    }
    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) {
        errors.push({
          type: 'Query',
          errors: parsed.error.flatten().fieldErrors,
        });
      }
    }
    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) {
        errors.push({
          type: 'Body',
          errors: parsed.error.flatten().fieldErrors,
        });
      }
    }
    if (errors.length > 0) {
      const error = new ValidationError(
        'error validating request',
        422,
        errors
      );
      throw error;
    }
    return next();
  };
