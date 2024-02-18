import { IsBoolean, IsEmail, IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";
import { CreateAdressDto } from "./CreateAdress.dto";
import { Type } from "class-transformer";

export class CreateUserDto{
    @IsNotEmpty() //Validation using the "class-validator" library
    name : string;

    @IsNotEmpty() //Validation using the "class-validator" library
    age : number;

    @IsEmail()
    email : string;

    @IsBoolean()
    isActive: boolean;

    // how to validate nested object
    // @ValidateNested()
    // @Type(() => CreateAdressDto)
    // @IsNotEmptyObject()
    // address : CreateAdressDto;
}