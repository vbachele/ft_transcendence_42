export interface HttpExceptionResponse {
	statusCode: number,
	error : string,
}

export interface CustomeHttpExceptionResponse extends HttpExceptionResponse {
	path: string,
	method : string,
	timeStamp: Date,
}
