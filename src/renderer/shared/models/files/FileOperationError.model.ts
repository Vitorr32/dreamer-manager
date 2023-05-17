export class FileOperationError {
    error: boolean;
    message: string;

    constructor(error: boolean, message: string) {
        this.error = error;
        this.message = message;
    }
}
