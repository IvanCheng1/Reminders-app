import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteReminder,
  handleSetReminder,
  ReminderActionTypes,
} from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { IReminder } from "../store/reducers/remindersReducer";

interface IProps {
  r: IReminder;
}

interface IState {
  editing: boolean;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Reminder extends React.Component<Props, IState> {
  state: IState = {
    editing: false,
  };

  setReminder = () => {
    this.props.handleSetReminder(this.props.r);
  };

  deleteReminder = () => {
    this.props.handleDeleteReminder(this.props.r);
  };

  editReminder = () => {
    this.setState((prev) => ({
      editing: !prev.editing,
    }));
  };

  render() {
    const { r } = this.props;
    const { editing } = this.state;

    return (
      <>
        <li>
          <input
            type="checkbox"
            onClick={() => this.setReminder()}
            defaultChecked={r.completed}
          />
          {r.reminder}
          {r.completed ? " - completed " : " - not completed "}
          {/* <button onClick={this.setReminder}>complete</button> */}

          {editing ? (
            <>
              <button onClick={this.deleteReminder}>delete</button>
              <button onClick={this.editReminder}>save</button>
            </>
          ) : (
            <button onClick={this.editReminder}>edit</button>
          )}
        </li>
      </>
    );
  }
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleSetReminder: (reminder: IReminder) => void;
  handleDeleteReminder: (reminder: IReminder) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleSetReminder: bindActionCreators(handleSetReminder, dispatch),
  handleDeleteReminder: bindActionCreators(handleDeleteReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
