import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dispatch } from "@app/redux/types";
import { IRootState } from "@app/redux/root-reducer";
import { inputsActions } from "./actions";
import { InputsState } from "./reducer";
import {IChangeValue, IfetchServerRequest, IfetchServerSuccess} from "@app/containers/Inputs/actions";
import {InputNumber} from "@app/components/inputNumber";
import {InputSlider} from "@app/components/inputSlider";

interface IStateProps {
  alertData: InputsState["alert"];
  inputsData: IfetchServerSuccess[];
}

interface IDispatchProps {
  fetchRequest: (payload: IfetchServerRequest) => void;
  changeValue: (payload: IChangeValue) => void;
}

export interface IHandleChange {
  value: number;
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

    changeValue({
      value,
      index,
      items: inputsData,
      // skipValue,
    });
  }

  public componentWillMount() {
    this.props.fetchRequest({count: 3});
  }

  public render() {
    const { inputsData } = this.props;
    return (
      inputsData.map((item, index) => (
        <div key={index}>
          <label htmlFor="input-1">{item.Name}</label>
          <InputSlider
            index={index}
            value={item.Percent.toString()}
            handleChange={this.handleChange}
          />
          <InputNumber
            index={index}
            value={item.Percent.toString()}
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
