import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, CanActivate } from '@nestjs/common';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
