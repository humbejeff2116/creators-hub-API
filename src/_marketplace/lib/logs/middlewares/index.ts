import { NextFunction, Request, Response } from "express";
import { logger } from "../logger.js";
import { APIError, errorHandler } from "../errorHandler.js";

export const notFoundHandler = async (req: Request, res: Response) => {
    logger.warn('route not found');
    res.status(404).json('route not found');
};


// log and forwarderror
export const errorLogerHandler = async (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    logger.error('centralized error handling->>>>', err);
    next(err);
};

// handle operational errors
export const operationalErrorHandler = async (
    err: APIError, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (!errorHandler.isTrustedError(err)) {
        next(err);
    }
    await errorHandler.handleOperationalError(err, res);
};

export const finalErrorHandler = async (
    err: Error, 
    req: Request, 
    res: Response
) => {
    await errorHandler.handleError(err, res);
};

export function handleUncaughtExceptions(server) {
    // throw unhandled rejection to another fallback handler we already have.
    process.on('unhandledRejection', (reason: Error) => {
        throw reason;
    });
        
    process.on('uncaughtException', (err: Error) => {
        logger.error('centralized error handling->>>>', err);
        errorHandler.sendErrorDetails(err);
        if (!errorHandler.isTrustedError(err)) {
            process.exit(1);
        }
    });

    // Critical errors, such as database disconnections, 
    // require shutting down the application to prevent serving bad data
    process.on('SIGTERM', () => {
        logger.warn('SIGTERM received. Shutting down gracefully...');
        server.close(() => {
            logger.info('Process terminated!');
        });
    });
}