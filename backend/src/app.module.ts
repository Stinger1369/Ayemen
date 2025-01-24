import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Initialisation des variables d'environnement
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/cleaning_service'),
    UsersModule,
    SchedulesModule,
    AuthModule,
  ],
  providers: [], // Suppression temporaire de l'APP_GUARD
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware désactivé temporairement, pas besoin de configurer .apply()
  }
}
