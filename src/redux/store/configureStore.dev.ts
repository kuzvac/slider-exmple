import { applyMiddleware, compose, createStore } from "redux";
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
    compose(
      applyMiddleware(
        sagaMiddleware,
        // other store enhancers if any
      ),
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f: Function) => f// tslint:disable-line
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("@app/redux/root-reducer", () => {
      const nextRootReducer = require("@app/redux/root-reducer").rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(rootSaga);
  return {store};
}
