"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const path = request.route?.path;
        const method = request.method;
        console.log(`Request Path: ${path}, Method: ${method}`);
        const excludedRoutes = [
            { path: '/users/signin', method: 'POST' },
            { path: '/users/signup', method: 'POST' },
            { path: '/schedules', method: 'POST' },
        ];
        const isExcluded = excludedRoutes.some((route) => route.path === path && route.method === method);
        if (isExcluded) {
            console.log(`Exclusion detected for path: ${path}, method: ${method}`);
            return true;
        }
        const authHeader = request.headers.authorization;
        console.log('Authorization Header:', authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing or invalid authorization header');
        }
        const token = authHeader.split(' ')[1];
        console.log('Extracted Token:', token);
        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'defaultSecret' });
            console.log('Token décodé :', decoded);
            request.user = decoded;
            return true;
        }
        catch (error) {
            console.error('Erreur de validation du token :', error.message);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map