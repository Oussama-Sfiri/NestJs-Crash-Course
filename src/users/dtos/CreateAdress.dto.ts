import { IsNotEmpty } from "class-validator";

export class CreateAdressDto {
    @IsNotEmpty()
    line1 : string;
    
    line2 : string;

    @IsNotEmpty()
    zip : string;

    @IsNotEmpty()
    city : string;
    
    @IsNotEmpty()
    state : string;
}