import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './models/auth.model';
import { RegisterInput } from './dto/register.dto';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { LoginInput } from './dto/login.dto';
import { ITokens } from './dto/tokens.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly repo: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const auth = await this.findByEmail(email);
    if (auth && auth.hash === pass) {
      const { hash, salt, ...result } = auth;
      return result;
    }
    return null;
  }

  async login(input: LoginInput): Promise<ITokens> {
    const users = await this.userService.findAll({ email: input.email });
    if (users.length) {
      const logins = await this.repo.find({
        where: {},
        relations: ['auth'],
      });
      const payload = {
        email: input.email,
        id: logins[0].user.id,
        role: users[0].role,
      };
      return {
        accessToken: this.jwtService.sign(payload, {
          expiresIn: process.env.MODE === 'DEV' ? '30m' : '5m',
          secret: process.env.JWT_SECRET,
        }),
        refreshToken: this.jwtService.sign(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_SECRET,
        }),
      };
    } else throw new NotFoundException();
  }

  async register(input: RegisterInput) {
    const logins = await this.userService.findAll({ email: input.email });
    if (logins.length === 0) {
      const { password, ...userInput } = input;
      const created = await this.userService.create(User.fromInput(userInput));

      const authInput = new Auth();
      authInput.hash = input.password; //TODO
      authInput.salt = input.password; //TODO
      authInput.user = created;

      const auth = await this.repo.create(authInput);
      return { status: 'created' };
    } else throw new ConflictException();
  }

  async refresh(token: string): Promise<ITokens> {
    const tokenData = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const usr = await this.userService.findOneById(tokenData.id);

    const payload = {
      email: usr.email,
      id: usr.id,
      role: usr.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.MODE === 'DEV' ? '30m' : '5m',
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async findByEmail(email: string): Promise<Auth> {
    const usr = await this.userService.findAll({ email });
    if (usr) {
      if (usr.length) {
        const login = await this.repo.find({
          where: { user: usr[0].id as any },
        });
        return login[0];
      } else throw new NotFoundException();
    } else throw new NotFoundException();
  }

  async verifyUser(token: string): Promise<User> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    if (payload) return await this.userService.findOneById(payload.id);
    else throw new BadRequestException();
  }

  async verify(token: string): Promise<[string, string]> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    if (payload) return [payload.id, payload.role];
    else throw new BadRequestException();
  }
}
