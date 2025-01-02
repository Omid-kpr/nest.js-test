import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) { }
    async signup(createUserDto: CreateUserDto) {
        const user = await this.userService.findByEmail(createUserDto.email);
        console.log(`results for finding user: ${user}`)
        if (!user) {
            const isPriary = !(await this.userService.findAnyUser());
            createUserDto.role = isPriary ? Role.ADMIN : Role.USER;
            return await this.userService.create(createUserDto);
        } else {
            throw new ConflictException('User already exists');
        }
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) { throw new UnauthorizedException('User not found'); }
        const isPasswordValid = verify(user.password, password);
        if (!isPasswordValid) { throw new UnauthorizedException('Invalid password'); }

        return { id: user.id, email: user.email, role: user.role };
    }
}
