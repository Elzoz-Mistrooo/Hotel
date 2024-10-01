import { Request, Response } from 'express';
import { getAvailableRooms, createRoom } from '../services/hotelservices.service';

// Controller function to fetch available rooms
export const AvailableRooms = async (req: Request, res: Response) => {

  const hotelId = parseInt(req.params.hotelId);
  const roomId = req.body.roomId ? parseInt(req.body.roomId) : null;

  if (isNaN(hotelId)) {
    return res.status(400).json({ message: 'Invalid hotel ID' });
  }

  try {
    // Get all available rooms for the hotel
    const availableRooms = await getAvailableRooms(hotelId);

    if (roomId) {
      // Check if the specific room is available
      const isRoomAvailable = availableRooms.some(room => room.id === roomId);
      return res.status(200).json({
        message: `Room ${roomId} is ${isRoomAvailable ? 'available' : 'not available'}.`,
      });
    }

    // Return all available rooms if no roomId is provided
    return res.status(200).json(availableRooms);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching available rooms' });
  }
};

export const createRoomController = async (req: Request, res: Response) => {
    const { hotelId, name, capacity, price, status } = req.body;
    try {
        const newRoom = await createRoom({ hotelId, name, capacity, price, status });
        return res.status(201).json(newRoom);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating room' });
    }
};
