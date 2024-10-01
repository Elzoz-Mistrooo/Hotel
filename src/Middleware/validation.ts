import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi'; // Import the Joi schema type

// Middleware to validate request data using Joi schema
export const validateRequest = (schema: ObjectSchema) => {
return (req: Request, res: Response, next: NextFunction) => {
  const UserRequests={...req.body,...req.params,...req.query}
  const validationResult=schema.validate(UserRequests, {abortEarly:false})
  if (validationResult.error) {
    const errorMessages = validationResult.error.details.map(err => err.message);
    return next(new Error(errorMessages.join(', ')));
  }
  next();
}
}
