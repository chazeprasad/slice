export class ApiError extends Error {
    message: string;

    status?: string;

    isPublic?: boolean;

    constructor(message: any, status?: any, isPublic?: boolean) {
        super(message);
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
    }
}

export class AuthenticationError extends ApiError {}
export class MissingTokenError extends ApiError {}
export class InvalidTokenError extends ApiError {}
export class InvalidUsernameError extends ApiError {}
export class MissingVersionError extends ApiError {}
export class RecordNotFoundError extends ApiError {}
export class InvalidObjectIdError extends ApiError {}
