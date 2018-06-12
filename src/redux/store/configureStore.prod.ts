import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer, IRootState } from "@app/redux/root-reducer";
import { rootSaga } from "@app/sagas/root-saga";

declare global {
  interface Window { // tslint:disable-line:interface-name
    __REDUX_DEVTOOLS_EXTENSION__: () => Function; // tslint:disable-line:ban-types
  }
}

export default function configureStore(initialState?: IRootState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState!,
    applyMiddleware(
      sagaMiddleware,
    ),
  );

  sagaMiddleware.run(rootSaga);
  return {store};
}
