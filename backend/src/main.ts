import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // M4: Task 4.0 - Enable CORS
  // This allows your frontend (e.g., running on port 5173 or 3001) 
  // to make API calls to your backend (port 3000).
  app.enableCors({
    origin: '*', // For development, allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Use a standard Node signal handler (SIGTERM) to ensure clean shutdown.
  process.on('SIGTERM', async () => {
    await app.close();
  });
  
  await app.listen(3000);
}
bootstrap();