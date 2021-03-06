import {createStandardAction, createAsyncAction} from "typesafe-actions";

export interface IfetchServerRequest {
  count: number;
}

export interface IfetchServerSuccess {
  Name: string;
  Percent: number;
}

export interface IfetchServerFailure {
  show: boolean;
  type: string;
  message: string;
}

export interface IChangeValue {
  value: number;
  index: number;
  items: IfetchServerSuccess[];
  // skipValue: boolean;
}

export const inputsActions = {
  fetchServer: createAsyncAction(
    "FETCH_SERVER_REQUEST",
    "FETCH_SERVER_SUCCESS",
    "FETCH_SERVER_FAILURE",
  )<IfetchServerRequest, IfetchServerSuccess[], IfetchServerFailure>(),
  changeValue: createStandardAction("INPUT_CHANGE")<IChangeValue>(),
};
