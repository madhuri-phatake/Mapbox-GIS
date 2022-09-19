import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: false,
  //     enableDebugMessages: false,
  //     whitelist: false,
  //     forbidNonWhitelisted: false,
  //   }),
  // );
  // const config = new DocumentBuilder()
  //   .setTitle('Book Management')
  //   .setDescription('Add show Edit Delete -> Book data')
  //   .setVersion('1.0')
  //   .addTag('Group D Assignment')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  // app.enableCors();
  await app.listen(3001);
}
bootstrap();
