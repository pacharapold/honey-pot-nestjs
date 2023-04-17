import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CRequest, CRequestStat } from './constant';

@Injectable()
export class AppService {
  collect(req: Request) {
    const id = Date.now().toString(36);
    CRequest.push({
      id,
      ts: Date.now(),
      path: req.path,
      method: req.method as 'GET' | 'PUT' | 'POST' | 'DELETE',
      header: req.headers,
      body: req.body ?? null,
      queryStr: req.query ?? null,
      hide: false,
    });
    CRequestStat.counter++;
    CRequestStat.method[req.method.toUpperCase()].push(id);
    return CRequestStat.customResponse;
  }
}
