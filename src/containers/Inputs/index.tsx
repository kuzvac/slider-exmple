import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dispatch } from "@app/redux/types";
import { IRootState } from "@app/redux/root-reducer";
import { inputsActions } from "./actions";
import { InputsState } from "./reducer";
import {IChangeValue, IfetchServerSuccess} from "@app/containers/Inputs/actions";
import {InputNumber} from "@app/components/inputNumber";
import {InputSlider} from "@app/components/inputSlider";
import {checkInteger} from "@app/helper";

interface IStateProps {
  alertData: InputsState["alert"];
  inputsData: IfetchServerSuccess[];
}

interface IDispatchProps {
  fetchRequest: () => void;
  changeValue: (payload: IChangeValue) => void;
}

export interface IHandleChange {
  value: string;
  index: number;
}

type ComponentProps = IStateProps & IDispatchProps;

class InputsComponent extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange({value, index}: IHandleChange) {
    const {changeValue, inputsData} = this.props;
    const regex = /(\d{1,3})(\D+)?(\d{0,2})?/g;
    const rawNumber: any = regex.exec(value);
    let resultNumber = parseFloat(`${rawNumber[1]}.${rawNumber[3]}`);

    if (rawNumber[2] && !rawNumber[3]) {
      resultNumber = parseInt(`${rawNumber[1]}`, 10);
    }

    if (resultNumber > 100) {
      resultNumber = 100;
    }

    changeValue({
      value: resultNumber,
      index,
      items: inputsData,
    });
  }

  public componentWillMount() {
    this.props.fetchRequest();
  }

  public render() {
    const { inputsData } = this.props;
    return (
      inputsData.map((item, index) => (
        <div key={index}>
          <label htmlFor="input-1">{item.Name}</label>
          <InputSlider
            index={index}
            value={checkInteger(item.Percent)}
            handleChange={this.handleChange}
          />
          <InputNumber
            index={index}
            value={checkInteger(item.Percent)}
            handleChange={this.handleChange}
          />
        </div>
      ))
    );
  }
}

const mapStateToProps = ({ inputs }: IRootState) => ({
  alertData: inputs.alert,
  inputsData: inputs.items,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchRequest: inputsActions.fetchServer.request,
  changeValue: inputsActions.changeValue,
}, dispatch);

export const InputsContainer =
  connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(InputsComponent);
