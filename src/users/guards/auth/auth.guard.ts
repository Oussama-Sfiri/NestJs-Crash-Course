import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest() as Request;
    console.log(request.headers);

    const { authorization } = request.headers;
    if(!authorization){
      console.log('No Authorization token');
      return false; // quand le guard return false la request actulle ne sera pas fonctionné
    }
    
    if(authorization === 'token123'){
      return true; // quand le guard return true la request actuelle fonctionne sans aucun probleme
    }else{
      console.log('Invalid Authorization token');
      return false;
    }

  }
}