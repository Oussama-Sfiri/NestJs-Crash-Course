import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Example Middleware");
    console.log(req.headers.authorization);

    const { authorization } = req.headers;
    if(!authorization){
      throw new HttpException('No Authorization token', HttpStatus.FORBIDDEN);
    }
    
    if(authorization === 'token123'){
      next();
    }else{
      throw new HttpException('Invalid Authorization token', HttpStatus.FORBIDDEN);
    }
    
  }
}
