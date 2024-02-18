import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor(msg? : string, status? : HttpStatus){ // msg?, status? çà veut dire que les parametre msg et status sont des parametre optionelle
        super(msg || "User Not Found", status || HttpStatus.NOT_FOUND);
    };
};