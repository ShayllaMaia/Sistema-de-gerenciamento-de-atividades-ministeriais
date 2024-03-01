import pkg from "express";
const { NextFunction, Request, Response } = pkg;

class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal Server Error." });
};

export { AppError, errorHandler };