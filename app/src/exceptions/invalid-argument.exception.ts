import { HttpStatus } from '@nestjs/common';

export class InvalidArgumentException extends Error {
    constructor(message: string) {
      super(message);
      this.statusCode = HttpStatus.BAD_REQUEST;
    }

    statusCode: HttpStatus;
}