import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { AuthService } from 'src/auth/auth.service';
import { loginDto } from './dtos/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async userRegister(@Body() dto: UserRegisterDto) {
    return await this.userService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('allUsers')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('login')
  async login(@Body() dto: loginDto) {
    return this.authService.validateUser(dto.username, dto.password);
  }
}
