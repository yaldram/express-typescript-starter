export function asyncHandler(fun: any) {
  return function asyncMiddleware(...args: any) {
    const funReturn = fun(...args);
    const next = args[args.length - 1];
    return Promise.resolve(funReturn).catch(next);
  };
}
