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

interface ReminderProps {
  r: IReminder;
}

type Props = ReminderProps & LinkStateProps & LinkDispatchProps;

function Reminder({ r, handleSetReminder, handleDeleteReminder }: Props) {
  const setReminder = () => {
    handleSetReminder(r);
  };

  const deleteReminder = () => {
    handleDeleteReminder(r);
  };

  return (
    <>
      <li>
        {r.reminder}
        {r.completed ? " - completed " : " - not completed "}
        <button onClick={setReminder}>complete</button>
        <button onClick={deleteReminder}>delete</button>
      </li>
    </>
  );
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleSetReminder: (reminder: IReminder) => void;
  handleDeleteReminder: (reminder: IReminder) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: ReminderProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: ReminderProps
): LinkDispatchProps => ({
  handleSetReminder: bindActionCreators(handleSetReminder, dispatch),
  handleDeleteReminder: bindActionCreators(handleDeleteReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
