import { takeLatest, /*takeEvery, */call, put } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { inputsActions } from "./actions";
import fakeApi from "../../services/fakeApi/index.js";
import {IChangeValue, IfetchServerRequest, IfetchServerSuccess} from "@app/containers/Inputs/actions";

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

interface IGetInputs {
  type: string;
  payload: IfetchServerRequest;
}

interface IPercents {
  summ: number;
  numbers: any[];
}

function compareNumbers(a: any, b: any) {
  return a - b;
}

function* greatherOrLessMax(percentsArray: IPercents, itemsArray: IfetchServerSuccess[]) {
  const resultItems: IfetchServerSuccess[] = Object.assign([], itemsArray);
  const resultPercentsArray: IPercents = Object.assign({}, percentsArray);
  if (resultPercentsArray.summ > 100) {
    for (; resultPercentsArray.summ !== 100;) {
      const maxIndex = resultPercentsArray.numbers.indexOf(Math.max(...resultPercentsArray.numbers));
      const diff = resultPercentsArray.summ - 100;
      const rawPercents = +(resultItems[maxIndex].Percent - diff).toFixed(2);
      const resultPercents = rawPercents < 0 ? 0 : rawPercents;
      resultItems[maxIndex] = Object.assign({}, resultItems[maxIndex], {
        ...resultItems[maxIndex],
        Percent: resultPercents,
      });

      if (rawPercents < 0) {
        resultPercentsArray.summ = resultPercentsArray.summ - resultPercentsArray.numbers[maxIndex];
      } else {
        resultPercentsArray.summ = resultPercentsArray.summ - diff;
      }
      resultPercentsArray.numbers[maxIndex] = resultPercents;
    }
  }

  if (resultPercentsArray.summ < 100) {
    const diff = 100 - resultPercentsArray.summ;
    const sortNumbers = Object.assign([], resultPercentsArray.numbers).sort(compareNumbers);
    const minNumber = sortNumbers[0] === "" ? sortNumbers[1] : sortNumbers[0];
    const minIndex = resultPercentsArray.numbers.indexOf(minNumber);
    resultItems[minIndex] = Object.assign({}, resultItems[minIndex], {
      ...resultItems[minIndex],
      Percent: +(resultItems[minIndex].Percent + diff).toFixed(2),
    });
  }

  return resultItems;
}

function* getInputs({payload}: IGetInputs) {
  try {
    const response: Iresponse = yield call(fakeApi.getData, payload.count);
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
