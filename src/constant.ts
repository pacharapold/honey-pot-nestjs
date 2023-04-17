import { TRequestGeneral } from './types';

export const CRequest: TRequestGeneral[] = [];

export const CRequestStat = {
  method: {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
  },
  hide: [],
  counter: 0,
  customResponse: {
    result: 'SUCCESS',
  },
};
