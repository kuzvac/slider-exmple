import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dispatch } from "@app/redux/types";
import {IfetchServerRequest, inputsActions} from "@app/containers/Inputs/actions";

interface IOwnProps {
  buttons: string[];
}

interface IDispatchProps {
  fetchRequest: (payload: IfetchServerRequest) => void;
}

type ComponentProps = IOwnProps & IDispatchProps;

class ButtonsComponent extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(event: React.SyntheticEvent<HTMLButtonElement>) {
    const count: any = event.currentTarget.dataset;
    this.props.fetchRequest({count: count.count});
  }

  public render() {
    return(
      this.props.buttons.map((item, index) => (
        <button key={index} onClick={this.handleClick} data-count={index + 1}>{item}</button>
      ))
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchRequest: inputsActions.fetchServer.request,
}, dispatch);

export const ButtonsContainer =
  connect<{}, IDispatchProps>(null, mapDispatchToProps)(ButtonsComponent);
