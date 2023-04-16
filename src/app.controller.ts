import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  getHello() {
    return { result: 'PONG' };
  }

  @Get('honeypot-stats')
  stats() {
    return this.appService.getRequests();
  }

  @Post('*')
  honeyPort(@Req() req: Request) {
    this.appService.collect(req);
    return { result: 'SUCCESS' };
  }
}
