import { HttpStatus } from '@nestjs/common';

export class ForbidenException extends Error {
    constructor(message: string) {
      super(message);
      this.statusCode = HttpStatus.FORBIDDEN;
    }

    statusCode: HttpStatus;
}