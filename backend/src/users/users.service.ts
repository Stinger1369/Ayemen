import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Inscription (signup)
  async create(user: Partial<User>): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({ ...user, password: hashedPassword });
    return newUser.save();
  }

  // Connexion (signin)
  async validateUser(email: string, password: string): Promise<User | null> {
  console.log('Validation de l’utilisateur :', email);

  const user = await this.userModel.findOne({ email }).exec();
  if (!user) {
    console.log('Utilisateur non trouvé');
    throw new BadRequestException('User not found');
  }

  console.log('Utilisateur trouvé :', user);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Le mot de passe correspond :', isMatch);

  if (!isMatch) {
    console.log('Mot de passe incorrect');
    throw new BadRequestException('Invalid credentials');
  }

  console.log('Utilisateur validé avec succès');
  return user;
}

  // Trouver tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Trouver un utilisateur par email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Supprimer un utilisateur
  async deleteById(userId: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(userId);
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  // Mettre à jour un utilisateur
  async updateById(userId: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  // Trouver des utilisateurs par rôle
  async findByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }
}
