import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { MonitorService } from './monitor/monitor.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly monitorService: MonitorService,
  ) {}

  @Get('ping')
  getHello() {
    return { result: 'PONG' };
  }

  @Get('stats')
  stats() {
    return this.monitorService.stats();
  }

  @Get('requests')
  requests(@Query() queryStr) {
    return this.monitorService.requests(queryStr);
  }

  @Get('request/:id')
  request(@Param('id') id) {
    return this.monitorService.request(id);
  }

  @Post('response')
  response(@Body() body) {
    return this.monitorService.response(body);
  }

  @Post('*')
  honeyPortPost(@Req() req: Request) {
    return this.appService.collect(req);
  }
  @Get('*')
  honeyPortGet(@Req() req: Request) {
    return this.appService.collect(req);
  }
  @Put('*')
  honeyPortPut(@Req() req: Request) {
    return this.appService.collect(req);
  }
  @Delete('*')
  honeyPortDelete(@Req() req: Request) {
    return this.appService.collect(req);
  }
}
