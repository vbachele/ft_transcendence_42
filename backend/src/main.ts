import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

const oneWeek = 1000 * 60 * 60 * 24 * 7;

async function bootstrap() {
	// Set the maximum size of a request body to 50MB
	const app = await NestFactory.create(AppModule, {cors: true});
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
	app.enableCors({
		origin: ['http://localhost:5173', 'http://localhost:3000'],
		allowedHeaders: ['content-type'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.use(
		session({
			secret: 'pass',
			resave: false,
			saveUninitialized: true,
			cookie: {maxAge: oneWeek},
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
