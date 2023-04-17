export type TRequestGeneral = {
  id: string;
  ts: number;
  path: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  header: object;
  body?: object;
  queryStr?: object;
  hide: boolean;
};
