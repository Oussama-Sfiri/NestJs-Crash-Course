import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);

    const parsedAgeToInt = parseInt(value.age.toString());
    if(isNaN(parsedAgeToInt)){
      console.log(`${value.age} is no a number`);
      throw new HttpException("Invalid Data Type for property age. Expected Number",HttpStatus.BAD_REQUEST);
    }else{
      console.log(`${parsedAgeToInt} is a number. Returning...`);
      return {...value, age : parsedAgeToInt};
    }

  }
}
