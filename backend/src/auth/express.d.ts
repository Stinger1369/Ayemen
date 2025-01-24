import { User } from './user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Ajoutez le type User pour req.user
    }
  }
}
