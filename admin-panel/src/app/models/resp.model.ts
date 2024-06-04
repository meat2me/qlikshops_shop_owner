export interface Resp {
  rc: number;
  message: string;
}

export interface ErrorResp extends Resp {
  param?: string;
}
