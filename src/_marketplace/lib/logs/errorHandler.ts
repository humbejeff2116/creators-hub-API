import { Response } from "express";

// TODO... set appropriate forbidden status code
export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

class BaseError extends Error {
    public readonly statusCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: HttpStatusCode,  
        isOperational: boolean,
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}
   
export class APIError extends BaseError {
    constructor(
        message: string, 
        statusCode = HttpStatusCode.INTERNAL_SERVER, 
        isOperational = true,
    ) {
        super(message, statusCode, isOperational);
    }
}

class ErrorHandler { 
    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }

    public async handleOperationalError(err: APIError, res: Response): Promise<void> {
        res.status(err.statusCode).json({
            status: err.statusCode,
            error: true,
            message: err.message
        })
    }

    public async handleError(err: Error, res: Response): Promise<void> {
        res.status(500).json({
            status: 500,
            error: true,
            message: 'Internal Server Error'
        })
    }

    public async sendErrorDetails(err: Error): Promise<void> {
        await this.sendAdminMail(err);
        // await sendEventsToSentry();
    }

    private async sendAdminMail(err: Error) {
        // TODO... send message to slack or telegram here
        console.log('sending message to admin',err);
    }
}

export const errorHandler = new ErrorHandler();