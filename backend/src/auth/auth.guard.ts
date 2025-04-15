import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, CanActivate } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const path = request.route?.path;
    const method = request.method;

    console.log(`Request Path: ${path}, Method: ${method}`);

    const excludedRoutes = [
      { path: '/users/signin', method: 'POST' },
      { path: '/users/signup', method: 'POST' },
      { path: '/reservations', method: 'POST' }, // Exclure POST /reservations
    ];

    const isExcluded = excludedRoutes.some(
      (route) => route.path === path && route.method === method,
    );

    if (isExcluded) {
      console.log(`Exclusion detected for path: ${path}, method: ${method}`);
      return true;
    }

    const authHeader = request.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'defaultSecret',
      });
      console.log('Token décodé :', decoded);
      request.user = decoded;
      return true;
    } catch (error) {
      console.error('Erreur de validation du token :', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
