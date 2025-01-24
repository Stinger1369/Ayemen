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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        console.log(`Validation de l'utilisateur : ${email}`);
        const user = await this.usersService.findByEmail(email);
        console.log('Utilisateur trouvé :', user);
        if (!user) {
            console.error(`Aucun utilisateur trouvé avec l'email : ${email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        console.log('Le mot de passe correspond :', passwordMatches);
        if (!passwordMatches) {
            console.error('Le mot de passe est incorrect');
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('Utilisateur validé avec succès');
        return user;
    }
    async login(user) {
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
        }
        catch (error) {
            console.error('Erreur lors de la génération du token :', error.message);
            throw new common_1.UnauthorizedException('Could not generate token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map