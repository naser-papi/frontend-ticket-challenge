export interface ISeat {
  rowIndex: number;
  colIndex: number;
  isReserve?: boolean;
  selectHandler?: (seat: ISeat) => void;
}

export enum PageRoutes {
  ROOT = "/",
  SEATS = "/seats/:mapId",
  TICKET = "/ticket"
}

export type ApiCallStatusType = "idle" | "pending" | "success" | "failed";
export type ApiMethodType = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export interface IApiCallConfig {
  url: string;
  method: ApiMethodType;
  noToken?: boolean;
  noShowError?: boolean;
  successHandler?: (object) => void;
  failedHandler?: (object) => void;
  validate?: (object) => Promise<boolean>;
  getBody?: () => FormData | object;
}
