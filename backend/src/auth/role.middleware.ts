import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware {
  static create(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log('Middleware exécuté. Headers:', req.headers);

      const user = req.user as { role: string };
      console.log('Utilisateur extrait avant vérification :', user);

      if (!user) {
        console.error('Utilisateur non authentifié.');
        throw new UnauthorizedException('User not authenticated');
      }

      if (roles.includes(user.role)) {
        console.log('Utilisateur autorisé :', user);
        next();
      } else {
        console.error('Accès refusé pour l’utilisateur :', user);
        throw new UnauthorizedException('Access denied');
      }
    };
  }

  use(req: Request, res: Response, next: NextFunction) {
    throw new Error('Direct instantiation is not supported. Use RoleMiddleware.create() instead.');
  }
}
