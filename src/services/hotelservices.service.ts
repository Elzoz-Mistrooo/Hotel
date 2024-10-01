import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RoomStatus } from '@prisma/client';
const prisma = new PrismaClient();

export const getAvailableRooms = async (hotelId: number) => {
  return await prisma.room.findMany({
    where: {
      hotelId: hotelId, // Assuming you have a hotelId in your Room model
      status: RoomStatus.AVAILABLE,  // Assuming you have an 'available' field in your Room model
    },
  });

};
export const createRoom = async (data: { hotelId: number; name: string; capacity: number; price: number; status?: RoomStatus }) => {
  // If status is not provided, default to 'AVAILABLE'
  const roomStatus = data.status || RoomStatus.AVAILABLE;


  return await prisma.room.create({
    data: {
      hotelId: data.hotelId,
      name: data.name,
      capacity: data.capacity,
      price: data.price,
      status: roomStatus, // Set the room status
    },
  });
};
