import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store/configureStore";
import {InputsContainer} from "@app/containers/Inputs";
import "@app/index.css";

const {store} = configureStore();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <InputsContainer/>
      </Provider>
    </AppContainer>,
    document.getElementById("root") as HTMLElement);
};

render();

if (module.hot) {
  module.hot.accept("@app/App", () => { render(); });
}

// registerServiceWorker();
