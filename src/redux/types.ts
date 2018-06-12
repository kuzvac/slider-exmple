import { Dispatch as ReduxDispatch} from "redux";
import { RootAction } from "@app/redux/root-action";

export type Dispatch = ReduxDispatch<RootAction>;
