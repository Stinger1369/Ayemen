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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("./users.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(user) {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new this.userModel({ ...user, password: hashedPassword });
        return newUser.save();
    }
    async validateUser(email, password) {
        console.log('Validation de l’utilisateur :', email);
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            console.log('Utilisateur non trouvé');
            throw new common_1.BadRequestException('User not found');
        }
        console.log('Utilisateur trouvé :', user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Le mot de passe correspond :', isMatch);
        if (!isMatch) {
            console.log('Mot de passe incorrect');
            throw new common_1.BadRequestException('Invalid credentials');
        }
        console.log('Utilisateur validé avec succès');
        return user;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async deleteById(userId) {
        const result = await this.userModel.findByIdAndDelete(userId);
        if (!result) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async updateById(userId, updateData) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async findByRole(role) {
        return this.userModel.find({ role }).exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map