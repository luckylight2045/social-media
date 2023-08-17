import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    const validatePass = await bcrypt.compare(password, user.password);

    if (!validatePass) {
      throw new BadRequestException();
    }

    return this.jwtSign(username, password);
  }

  async jwtSign(username: string, password: string) {
    const payload = {
      userName: username,
      password: password,
    };

    const secret = this.config.get('SECRET_KEY');

    const signToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.config.get('EXPIRE_TIME'),
      secret: secret,
    });

    return { access_token: signToken };
  }

  async validationUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      return null;
    }

    const verifiedUser = bcrypt.compare(user.password, password);

    if (!verifiedUser) {
      return null;
    }

    return user;
  }
}
