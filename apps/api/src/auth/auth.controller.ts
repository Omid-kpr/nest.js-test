import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("signup")
  signupUser(@Body() createUserDto: CreateUserDto) {
    console.log(`got createuserdto in auth.service/signupUser: ${createUserDto}`)
    return this.authService.signup(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  loginUser(@Request() req) {
    return req.user
  }
}



