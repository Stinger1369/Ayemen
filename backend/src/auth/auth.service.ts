import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(`Validation de l'utilisateur : ${email}`);
    const user = await this.usersService.findByEmail(email);
    console.log('Utilisateur trouvé :', user);

    if (!user) {
      console.error(`Aucun utilisateur trouvé avec l'email : ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    console.log('Le mot de passe correspond :', passwordMatches);

    if (!passwordMatches) {
      console.error('Le mot de passe est incorrect');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('Utilisateur validé avec succès');
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    console.log('Payload pour le token :', payload);

    try {
      const token = this.jwtService.sign(payload);
      console.log('Token généré :', token);
      return {
        accessToken: token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } catch (error) {
      console.error('Erreur lors de la génération du token :', error.message);
      throw new UnauthorizedException('Could not generate token');
    }
  }
}
