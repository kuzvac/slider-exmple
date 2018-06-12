import { getType } from "typesafe-actions";
import { RootAction } from "@app/redux/root-action";
import { inputsActions } from "./actions";
import {IfetchServerFailure, IfetchServerSuccess} from "@app/containers/Inputs/actions";

export type InputsState = Readonly<{
  pending: boolean,
  items: IfetchServerSuccess[],
  alert: IfetchServerFailure,
}>;

const initialState: InputsState = {
  pending: true,
  items: [],
  alert: {
    show: false,
    type: "",
    message: "",
  },
};

export const inputsReducer = (state: InputsState = initialState, action: RootAction) => {
  switch (action.type) {
    case getType(inputsActions.fetchServer.request):
      return Object.assign({}, state, {
        ...state,
        pending: true,
      });
    case getType(inputsActions.fetchServer.success):
      return Object.assign({}, state, {
        ...state,
        pending: false,
        items: action.payload,
      });
    case getType(inputsActions.fetchServer.failure):
      return Object.assign({}, state, {
        ...state,
        pending: false,
        items: [],
        alert: {...action.payload},
      });
    default:
      return state;
  }
};
