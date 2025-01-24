"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
//# sourceMappingURL=main.js.map