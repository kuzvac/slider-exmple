import { ActionType } from "typesafe-actions";
import { inputsActions } from "@app/containers/Inputs/actions";

const actions = {
  ...inputsActions,
};

export type RootAction = ActionType<typeof actions>;
