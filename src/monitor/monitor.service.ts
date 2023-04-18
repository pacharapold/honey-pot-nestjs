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
    path,
    matchPath,
    from,
    to,
  }: {
    limit?: string;
    order?: 'ASC' | 'DESC';
    method?: string;
    path?: string;
    matchPath?: string; // true | false
    from?: string;
    to?: string;
  }) {
    const req = CRequest.filter((item) =>
      method ? method.split(',').includes(item.method) : true,
    )
      .filter((item) =>
        path
          ? matchPath === 'true'
            ? item.path === `/${path}`
            : item.path.includes(`/${path}`)
          : true,
      )
      .filter((item) =>
        from ? item.ts >= this.convertDateToTimestamp(from) : true,
      )
      .filter((item) =>
        to ? item.ts <= this.convertDateToTimestamp(to) : true,
      )
      .slice(0, Number(limit || CRequest.length))
      .map((item) => {
        return { timestamp: new Date(item.ts).toISOString(), ...item };
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

  //convert yyyy-MM-dd as string to timestamp
  convertDateToTimestamp(date: string): number {
    const dateArray = date.split('-');
    return new Date(
      Number(dateArray[0]),
      Number(dateArray[1]) - 1,
      Number(dateArray[2]),
    ).getTime();
  }
}
