import { UsersService } from './users.service';
import { User } from './users.schema';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    signup(user: Partial<User>): Promise<User>;
    signin(credentials: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            role: any;
            firstName: any;
            lastName: any;
        };
    }>;
    createUser(user: Partial<User>): Promise<User>;
    findEmployees(): Promise<User[]>;
    findAdmins(): Promise<User[]>;
    findAll(): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
    updateUser(id: string, updateData: Partial<User>): Promise<User>;
}
