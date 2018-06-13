import * as React from "react";
import {IHandleChange} from "@app/containers/Inputs";

interface IInputNumber {
  value: string;
  handleChange: (response: IHandleChange) => void;
  index: number;
}

export const InputSlider: React.StatelessComponent<IInputNumber> = ({value, handleChange, index}) => {
  const inputChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    if (!event.currentTarget.value) {
      return;
    }

    handleChange({
      value: parseFloat(event.currentTarget.value),
      index,
    });
  };

  return (
    <input
      type="range"
      value={value}
      min="0"
      max="100"
      onChange={inputChange}
    />
  );
};
