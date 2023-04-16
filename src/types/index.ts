export type TRequestGeneral = {
  id: number;
  ts: number;
  path: string;
  method: string;
  header: object;
  body?: object;
  queryStr?: object;
  hide: boolean;
};
