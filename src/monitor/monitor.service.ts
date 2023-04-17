import { Injectable } from '@nestjs/common';
import { CRequest, CRequestStat } from 'src/constant';

@Injectable()
export class MonitorService {
  stats() {
    return {
      result: {
        ...CRequestStat,
        method: Object.keys(CRequestStat.method).map((m) => {
          return { method: m, count: CRequestStat.method[m].length };
        }),
      },
    };
  }

  requests({
    limit,
    order,
    method,
  }: {
    limit: string;
    order: 'ASC' | 'DESC';
    method: string;
  }) {
    const req = CRequest.filter((item) =>
      method.split(',').includes(item.method),
    )
      .slice(0, Number(limit || CRequest.length))
      .map((item) => {
        return { timestamp: new Date(item.ts).toLocaleString(), ...item };
      });
    return {
      result: {
        length: req.length,
        list: order === 'DESC' ? req.slice().reverse() : req,
      },
    };
  }

  request(id: string) {
    return { result: CRequest.find((item) => item.id === id) };
  }

  response(body) {
    CRequestStat.customResponse = body;
    console.log();
    return { result: body };
  }
}
