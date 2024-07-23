import {ErrorDto} from "./ErrorDto";

export type ApiError = {
  title: string;
  status: number;
  instance: string;
  created: string;
  errors: Array<ErrorDto>;
}
