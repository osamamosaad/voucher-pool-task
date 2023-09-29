import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends Error {
    constructor(message: string) {
      super(message);
      this.statusCode = HttpStatus.NOT_FOUND;
    }

    statusCode: HttpStatus;
}