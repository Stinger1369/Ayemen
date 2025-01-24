import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService, // Injection d'AuthService
  ) {}

  // Inscription
  @Post('signup')
  async signup(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }

  // Connexion
  @Post('signin')
  async signin(@Body() credentials: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user); // Retourne le token dans la réponse
  }
  // Ajouter un utilisateur (admin ou employé)
  @Post()
  async createUser(@Body() user: Partial<User>) {
    if (!user.role) {
      throw new BadRequestException('Role is required');
    }
    return this.usersService.create(user);
  }

  // Récupérer tous les employés
  @Get('employees')
  async findEmployees() {
    return this.usersService.findByRole('employee');
  }

  // Récupérer tous les administrateurs
  @Get('admins')
  async findAdmins() {
    return this.usersService.findByRole('admin');
  }

  // Récupérer tous les utilisateurs
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Supprimer un utilisateur par ID
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteById(id);
  }

  // Mettre à jour un utilisateur par ID
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.usersService.updateById(id, updateData);
  }
}
