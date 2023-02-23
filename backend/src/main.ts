import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as bodyParser from "body-parser";
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'

const oneWeek = 1000 * 60 * 60 * 24 * 7;

async function bootstrap() {
  // Set the maximum size of a request body to 50MB
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'pass',
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: oneWeek},
    })
  )
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
