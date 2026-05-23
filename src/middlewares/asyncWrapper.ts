import type { NextFunction, Request , Response} from 'express'

//This wraps any async function so that if it throws an error, Express catches it. Without this, async errors in routes are silently ignored in older versions of Express.
// export const asyncWrapper = function name(fn: Function) {
//   return function (req: Request, res: Response, next: NextFunction) {
//     return  Promise.resolve(fn(req, res, next)).catch(next)
//   }
// }
    
export const asyncWrapper = function name(fn: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    return Promise.resolve(fn(req, res, next)).catch(next)
//     //                                                ^^^^
//     //                    if fn throws, .catch(next) sends the
//     //                    error to your errorHandler automatically
  }
}