import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './reservations.schema';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() createReservationDto: Partial<Reservation>) {
    console.log('Received POST /reservations:', createReservationDto);
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.reservationsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: Partial<Reservation>,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.reservationsService.delete(id);
    return { message: 'Reservation deleted' };
  }
}
