import { Router } from "express";
import { validateRequest } from '../Middleware/validation';
import { AvailableRooms } from "../controllers/hotelservices.controller";
import *as vaildators from "./Routes.validation/validationRoutes"

const router = Router();

router.post('/check-room-availability', validateRequest(vaildators.roomAvailabilitySchema),AvailableRooms);




export default router;