import * as React from "react";
import {IHandleChange} from "@app/containers/Inputs";

interface IInputNumber {
  value: string;
  handleChange: (response: IHandleChange) => void;
  index: number;
}

export const InputNumber: React.StatelessComponent<IInputNumber> = ({value, handleChange, index}) => {
  const inputChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    if (!event.currentTarget.value) {
      return;
    }

    handleChange({
      value: event.currentTarget.value,
      index,
    });
  };

  return (
    <input
      type="text"
      value={value}
      id="input-1"
      onChange={inputChange}
    />
  );
};
