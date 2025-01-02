import { Role } from "../entities/user.entity";
import { IsDate, IsEmail, IsString } from "class-validator";
export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;

    @IsString()
    role?: Role

}
