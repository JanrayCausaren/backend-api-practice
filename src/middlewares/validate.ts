import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const requestSchema = z.object({
  body: z.any().optional(),
  params: z.any().optional(),
  query: z.any().optional(),
});

type RequestSchema = z.infer<typeof requestSchema>;

export function validate(schema: z.ZodType<RequestSchema>) {
  return (req: Request, res: Response, next: NextFunction) : void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      res.status(400).json({
        // success: false,
        errors: z.flattenError(result.error),   
      }); 
      console.log("Error Occurs in validation of request");
      
      return;
    }

    // Safely write back only what the schema validate  d
    req.body = result.data.body ?? req.body;
    req.params = result.data.params ?? req.params;
    // req.query = result.data.query ?? req.query;
    console.log("Request Validated");
    
    next();
  };
}







// export function validate(schema: z.ZodType<RequestSchema>) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     // try {
//     //   const result = schema.parse(req.body);
//     //   req.body = result.data;
//     //   next();
//     // } catch (error instanceof z.ZodError) {
//     //    res.status(400).json({
//     //     error: z.treeifyError(error),
//     //   });
//     //   return;
//     // }

//     const result = schema.safeParse(req.body);

//     if (!result.success) {
//       res.status(400).json({
//         error: z.treeifyError(result.error),
//       });
//       return;
//     }

//     req.body = result.data;
//     next();
//   };
// }
