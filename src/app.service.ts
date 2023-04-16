import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CRequest, CRequestStat } from './constant';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  collect(req: Request) {
    CRequest.push({
      id: CRequestStat.counter++,
      ts: Date.now(),
      path: req.path,
      method: req.method,
      header: req.headers,
      body: req.body ?? null,
      queryStr: req.query ?? null,
      hide: false,
    });
    CRequestStat.method[req.method.toUpperCase()].push(CRequestStat.counter);
  }

  getRequests() {
    return { result: { CRequestStat, CRequest } };
  }
}
