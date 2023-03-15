import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomeHttpExceptionResponse, HttpExceptionResponse } from "./httpExceptionResponseInterface";
import * as fs from 'fs'


interface CustomRequest extends Request {
	user: any;
  }

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let status : HttpStatus;
		let errorMessage: string;

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const errorResponse = exception.getResponse();

			errorMessage = (errorResponse as HttpExceptionResponse).error || exception.message
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			errorMessage = 'Critical internal server error occured'
		}
		const errorResponse = this.getErrorResponse(status, errorMessage, request);
		const errorLog = this.getErrorLog(errorResponse, request as CustomRequest, exception);
		this.writeErrorLogToFile(errorLog);
		response.status(status).json(errorResponse);

		}
		private getErrorResponse = (status: HttpStatus, errorMessage: string, request: Request):CustomeHttpExceptionResponse => ({
			statusCode: status,
			error: errorMessage,
			path: request.url,
			method: request.method,
			timeStamp: new Date(),
		});

		private getErrorLog = (errorResponse: CustomeHttpExceptionResponse, request: CustomRequest, exception: unknown): string => {
			const { statusCode, error} = errorResponse;
			const { method, url} = request;
			const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${request .url}\n\n
			${JSON.stringify(errorResponse)}\n\n
			Your error: ${JSON.stringify(request.user ?? error)}\n\n
			${exception instanceof HttpException ? exception.stack : error}\n\n`
			console.log('\x1b[31m%s\x1b[0m', `ERROR: An error ${statusCode} has just occured, look the error.log  file for more information`, );
			return errorLog;
		}

		private writeErrorLogToFile = (errorLog: string) : void => { 
			fs.appendFile('error.log', errorLog, 'utf-8', (err) => {
			if (err) throw err;
		})
		}
}