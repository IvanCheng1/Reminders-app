import React from "react";
import { connect } from "react-redux";
import { rootState } from "./store/reducers";
// import { useSelector } from "react-redux";
import "./App.css";
import Reminder from "./components/Reminder";
import ReminderInput from "./components/ReminderInput";
import { bindActionCreators } from "redux";
import { remindersState } from "./store/reducers/remindersReducer";
import {
  handleAddReminder,
  handleGetReminders,
  ReminderActionTypes,
} from "./store/actions/remindersActions";
import { ThunkDispatch } from "redux-thunk";
// import { remindersState } from "./store/reducers/remindersReducer";

interface AppProps {}

interface AppState {}

type Props = AppProps & LinkStateProps & LinkDispatchProps;

class App extends React.Component<Props, AppState> {
  // reminders = useSelector<remindersState, remindersState["reminders"]>(
  //   (state) => state.reminders
  // );

  componentDidMount = () => {
    // handleGetReminders()
  };

  // reminders = [];

  handleClickAddReminder = (reminder: string): void => {
    this.props.handleAddReminder(reminder);
  };

  render() {
    const { reminders } = this.props;
    return (
      <div className="App">
        Reminders
        <ReminderInput handleClickAddReminder={this.handleClickAddReminder} />
        <ul>
          {reminders.reminders.map((r) => (
            <Reminder r={r} key={r.reminder} />
            // <Reminder r={r} />
          ))}
        </ul>
      </div>
    );
  }
}

interface LinkStateProps {
  reminders: remindersState;
}

interface LinkDispatchProps {
  handleAddReminder: (reminder: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: AppProps
): LinkStateProps => ({
  reminders: state.reminders,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: AppProps
): LinkDispatchProps => ({
  handleAddReminder: bindActionCreators(handleAddReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
