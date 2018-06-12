/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */
declare function require(moduleName: string): any;

let loadedStore = null;

if (process.env.NODE_ENV === "production") {
  loadedStore = require("./configureStore.prod").default; // tslint:disable-line
} else {
  loadedStore = require(
    "./configureStore.dev").default // tslint:disable-line
}

export const configureStore = loadedStore;
