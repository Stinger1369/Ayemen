import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule), // Résoudre la dépendance circulaire
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporter UsersService pour d'autres modules
})
export class UsersModule {}
