import { takeLatest, call, put } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { inputsActions } from "./actions";
import fakeApi from "../../services/fakeApi/index.js";
import {IChangeValue, IfetchServerSuccess} from "@app/containers/Inputs/actions";

interface Iresponse {
  body: {
    Items: IfetchServerSuccess[],
  };
  err?: {
    message: string,
  };
}

interface ISetInputValue {
  type: string;
  payload: IChangeValue;
}

interface IPercents {
  summ: number;
  numbers: any[];
}

function* greatherOrLessMax(percentsArray: IPercents, itemsArray: IfetchServerSuccess[]) {
  const resultItems: IfetchServerSuccess[] = Object.assign([], itemsArray, [
    ...itemsArray,
  ]);
  if (percentsArray.summ > 100) {
    const maxIndex = percentsArray.numbers.indexOf(Math.max(...percentsArray.numbers));
    const diff = percentsArray.summ - 100;
    const resultPercents = +(resultItems[maxIndex].Percent - diff).toFixed(2);
    resultItems[maxIndex] = Object.assign({}, resultItems[maxIndex], {
      ...resultItems[maxIndex],
      Percent: resultPercents < 0 ? 0 : resultPercents,
    });
  }

  if (percentsArray.summ < 100) {
    const diff = 100 - percentsArray.summ;
    const sortNumbers = Object.assign([], percentsArray.numbers);
    const minIndex = percentsArray.numbers.indexOf(sortNumbers.sort()[1]);
    resultItems[minIndex] = Object.assign({}, resultItems[minIndex], {
      ...resultItems[minIndex],
      Percent: +(resultItems[minIndex].Percent + diff).toFixed(2),
    });
  }

  return resultItems;
}

function* getInputs() {
  try {
    // const token: Itoken = yield call(api.getToken, email, password);
    const response: Iresponse = yield call(fakeApi.getData);
    if (response.err) {
      throw response.err.message;
    }

    if (response.body.Items.length === 1) {
      yield put(inputsActions.fetchServer.success(response.body.Items));
      return response;
    }

    const requestPercents = response.body.Items.reduce((resultItems: IPercents, item) => {
      resultItems.numbers.push(item.Percent);
      resultItems.summ += item.Percent;

      return resultItems;
    }, {
      summ: 0,
      numbers: [],
    });

    const result = yield call(greatherOrLessMax, requestPercents, response.body.Items);
    yield put(inputsActions.fetchServer.success(result));
    return response;
  } catch (error) {
    yield put(inputsActions.fetchServer.failure({
      show: true,
      type: "danger",
      message: `Error: ${error}`,
    }));
  }
}

function* setInputValue({payload}: ISetInputValue) {
  let percents;
  let result;
  if (payload.items.length > 1) {
    percents = payload.items.reduce((resultItems: IPercents, item, index) => {
      if (index === payload.index) {
        resultItems.numbers.push("");
        resultItems.summ += payload.value;
        return resultItems;
      }
      resultItems.numbers.push(item.Percent);

      resultItems.summ += item.Percent;

      return resultItems;
    }, {
      summ: 0,
      numbers: [],
    });
    result = yield call(greatherOrLessMax, percents, payload.items);
  } else {
    result = Object.assign([], payload.items, [
      ...payload.items,
    ]);
  }

  result[payload.index] = Object.assign({}, payload.items[payload.index], {
    ...payload.items[payload.index],
    Percent: payload.value,
  });

  yield put(inputsActions.fetchServer.success(result));
  return result;
}

/******************************* WATCHERS *************************************/

export function* watchGetInputs() {
  yield takeLatest(getType(inputsActions.fetchServer.request), getInputs);
}
export function* watchInputChange() {
  yield takeLatest(getType(inputsActions.changeValue), setInputValue);
}
