import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, response, Response } from 'express';
import { AppService } from './app.service';
import { AuthUser } from './shared/decorators/user.decorator';
import { IAuthorizedUser } from './shared/dto/auth.interface';
import { AuthGuard } from './shared/security/jwt.guard';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health/:name?')
  @ApiOperation({ summary: 'Check application status' })
  @ApiResponse({ status: 200, description: 'it works fine!' })
  getHello(@Param('name') name?: string): string {
    return this.appService.health(name);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get user status of day!' })
  @ApiHeader({ name: 'Authorization' })
  @ApiResponse({ status: 200, description: 'Object' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUserStatus(@AuthUser() auth: IAuthorizedUser): string {
    return this.appService.getUserStatus(auth.id);
  }

  @Get('graphql')
  @ApiOperation({ summary: 'GRAPHQL available, Use POST => /graphql' })
  @ApiResponse({ status: 200, description: 'GRAPHQL available' })
  redirect() {
    return 'GRAPHQL available, Use POST => /graphql';
  }
}
