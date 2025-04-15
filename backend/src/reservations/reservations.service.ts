import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservations.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<ReservationDocument>,
  ) {}

  async create(
    createReservationDto: Partial<Reservation>,
  ): Promise<Reservation> {
    const newReservation = new this.reservationModel(createReservationDto);
    return newReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  async findById(id: string): Promise<Reservation> {
    const reservation = await this.reservationModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async update(
    id: string,
    updateReservationDto: Partial<Reservation>,
  ): Promise<Reservation> {
    const reservation = await this.reservationModel
      .findByIdAndUpdate(id, updateReservationDto, { new: true })
      .exec();
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async delete(id: string): Promise<void> {
    const result = await this.reservationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Reservation not found');
    }
  }
}
