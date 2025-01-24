import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Schedule } from './schedules.schema';

// Interface pour inclure adminKey temporairement
interface ScheduleWithAdminKey extends Partial<Schedule> {
  adminKey?: string;
}

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  // Clé d'administration à valider
  private readonly ADMIN_KEY = 'superAdmin123';

  // Création d'un planning unique
  @Post()
  async create(@Body() schedule: ScheduleWithAdminKey) {
    if (schedule.adminKey !== this.ADMIN_KEY) {
      throw new UnauthorizedException('Access denied: Invalid admin key');
    }
    delete schedule.adminKey;

    return this.schedulesService.create(schedule);
  }

  // Création de plannings multi-tâches sur plusieurs jours avec messages
  @Post('bulk')
  async createMultiple(
    @Body()
    data: {
      employeeId: string;
      tasks: { task: string; date: Date; message?: string }[];
      adminKey: string;
    },
  ) {
    if (data.adminKey !== this.ADMIN_KEY) {
      throw new UnauthorizedException('Access denied: Invalid admin key');
    }

    const { employeeId, tasks } = data;
    return this.schedulesService.createMultiple(employeeId, tasks);
  }

  // Récupération de tous les plannings
  @Get()
  async findAll() {
    return this.schedulesService.findAll();
  }

  // Mise à jour d'un planning
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateData: ScheduleWithAdminKey,
  ) {
    if (updateData.adminKey !== this.ADMIN_KEY) {
      throw new UnauthorizedException('Access denied: Invalid admin key');
    }
    delete updateData.adminKey;

    return this.schedulesService.update(id, updateData);
  }

  // Suppression d'un planning
  @Delete(':id')
  async delete(@Param('id') id: string, @Body() body: { adminKey: string }) {
    if (body.adminKey !== this.ADMIN_KEY) {
      throw new UnauthorizedException('Access denied: Invalid admin key');
    }

    return this.schedulesService.delete(id);
  }
}
