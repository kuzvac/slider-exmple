import * as React from "react";
import {IHandleChange} from "@app/containers/Inputs";

interface IInputNumber {
  value: string;
  handleChange: (response: IHandleChange) => void;
  index: number;
}

interface IState {
  value: string;
}

export class InputNumber extends React.Component<IInputNumber, IState> {
  public readonly state: IState = {
    value: this.props.value,
  };

  constructor(props: IInputNumber) {
    super(props);

    this.inputChange = this.inputChange.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
  }

  public static getDerivedStateFromProps(props: IInputNumber, state: IState) {
    // console.log(props, state); //tslint:disable-line
    const regex = /(\d{1,3})(\D+)?(\d{0,2})?/g;
    const rawNumber: any = regex.exec(state.value);
    if (rawNumber[2] && !rawNumber[3]) {
      return null;
    }

    return { value: props.value };
    // return null;
  }

  private inputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      return this.props.handleChange({
        value: 0,
        index: this.props.index,
      });
    }

    const regex = /(\d{1,3})(\D+)?(\d{0,2})?/g;
    const rawNumber: any = regex.exec(event.currentTarget.value);
    let resultNumber: number = parseFloat(`${rawNumber[1]}.${rawNumber[3]}`);
    let localNumber: string = `${resultNumber}`;

    if (rawNumber[2] && !rawNumber[3]) {
      resultNumber = parseFloat(`${rawNumber[1]}.0`);
      localNumber = `${rawNumber[1]}.`;
    }

    if (resultNumber > 100) {
      resultNumber = 100;
      localNumber = "100";
    }
    this.setState({value: localNumber});

    this.props.handleChange({
      value: resultNumber,
      index: this.props.index,
    });
  }

  private inputBlur(event: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({value: parseFloat(event.currentTarget.value).toString()});
  }

  public render() {
    return (
      <input
        type="text"
        value={this.state.value}
        id="input-1"
        onChange={this.inputChange}
        onBlur={this.inputBlur}
      />
    );
  }
}
