import Joi from 'joi';

// Define the validation schema using Joi
export const roomAvailabilitySchema = Joi.object({
  roomId: Joi.number().integer().required().messages({
    'number.base': 'Room ID must be an integer',
    'number.empty': 'Room ID cannot be empty',
    'any.required': 'Room ID is required',
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'Date must be a valid ISO 8601 format',
    'any.required': 'Date is required',
  }),
  time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
    'string.pattern.base': 'Time must be in HH:MM format',
    'any.required': 'Time is required',
  }),
});

// Define the TypeScript type for the schema to ensure type safety
export interface RoomAvailability {
  roomId: number;
  date: string; // Date as a string in ISO format
  time: string; // Time as a string in HH:MM format
}
export const validateRoomAvailability = (data: RoomAvailability) => {
  return roomAvailabilitySchema.validate(data);
};