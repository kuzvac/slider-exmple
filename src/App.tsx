import * as React from "react";
import {InputsContainer} from "@app/containers/Inputs";
import {ButtonsContainer} from "@app/containers/Buttons";

const buttons = [
  "один элемент",
  "два элемента",
  "три элемента",
  "четыре элемента",
  "пять элементов",
];

export const App: React.SFC<{}> = () => {
  return (
    <div>
      <ButtonsContainer buttons={buttons}/>
      <br /><br />
      <InputsContainer/>
    </div>
  );
};
