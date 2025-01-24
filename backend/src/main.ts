import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose'; // Import de Mongoose
import * as dotenv from 'dotenv';

dotenv.config(); // Charge les variables d'environnement

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer les logs de Mongoose
  mongoose.set('debug', true);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  console.log('Starting server...');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Server running on port: ${process.env.PORT || 3000}`);

  await app.listen(process.env.PORT || 3000);
  console.log('Server is running successfully.');
}
bootstrap();
