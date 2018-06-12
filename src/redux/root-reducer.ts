import { combineReducers } from "redux";
import { inputsReducer, InputsState } from "@app/containers/Inputs/reducer";

export interface IRootState {
  inputs: InputsState;
}

export const rootReducer = combineReducers<IRootState>({
  inputs: inputsReducer,
});
