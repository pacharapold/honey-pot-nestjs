import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';

@Module({
  controllers: [],
  providers: [MonitorService],
})
export class MonitorModule {}
