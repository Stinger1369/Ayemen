import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(user: Partial<User>): Promise<User>;
    validateUser(email: string, password: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    deleteById(userId: string): Promise<void>;
    updateById(userId: string, updateData: Partial<User>): Promise<User>;
    findByRole(role: string): Promise<User[]>;
}
