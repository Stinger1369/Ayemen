import { Request, Response, NextFunction } from 'express';
export declare class RoleMiddleware {
    static create(roles: string[]): (req: Request, res: Response, next: NextFunction) => void;
    use(req: Request, res: Response, next: NextFunction): void;
}
