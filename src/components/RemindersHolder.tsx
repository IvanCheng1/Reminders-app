import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ReminderActionTypes } from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { remindersState } from "../store/reducers/remindersReducer";
import Reminder from "./Reminder";
import ReminderInput from "./ReminderInput";

interface IProps {
  currentList: string;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class RemindersHolder extends React.Component<Props, IState> {
  render() {
    const { reminders, currentList } = this.props;
    return (
      <div className="main">
        <div className="reminders-page-holder">
          <div className="reminders-page-title">{currentList}</div>
          <div className="reminders-page-count">
            {reminders.reminders.filter((r) => r.for === currentList).length}
          </div>
        </div>
        <ReminderInput currentList={currentList} />

        <ul>
          {reminders.reminders
            .filter((r) => r.for === currentList)
            .map((r) => (
              <Reminder r={r} key={r.reminder} />
            ))}
        </ul>
      </div>
    );
  }
}

interface LinkStateProps {
  reminders: remindersState;
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  reminders: state.reminders,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RemindersHolder);
