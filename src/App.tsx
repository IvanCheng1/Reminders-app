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
  ReminderActionTypes,
} from "./store/actions/remindersActions";
import { ThunkDispatch } from "redux-thunk";
import ListInput from "./components/ListInput";
import { listState } from "./store/reducers/listReducer";
// import { remindersState } from "./store/reducers/remindersReducer";

interface AppProps {}

interface AppState {
  currentList: string;
}

type Props = AppProps & LinkStateProps & LinkDispatchProps;

class App extends React.Component<Props, AppState> {
  state: AppState = {
    currentList: "",
  };

  // handleClickAddReminder = (reminder: string): void => {
  //   this.props.handleAddReminder(reminder);
  // };

  handleChangeList = (nameOfList: string): void => {
    this.setState({
      currentList: nameOfList,
    });
  };

  render() {
    const { reminders, lists } = this.props;
    const { currentList } = this.state;
    return (
      <div className="App">
        <h1>Reminders</h1>
        <h4>Lists</h4>
        <ListInput />
        <div>Currently showing {currentList}</div>
        {lists.lists.map((l) => (
          <button onClick={() => this.handleChangeList(l.name)} key={l.name}>
            {l.name}
          </button>
        ))}
        <ReminderInput currentList={currentList} />
        <h4>Reminders</h4>
        <ul>
          {reminders.reminders
            .filter((r) => r.for === currentList)
            .map((r) => (
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
  lists: listState;
}

interface LinkDispatchProps {
  // handleAddReminder: (reminder: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: AppProps
): LinkStateProps => ({
  reminders: state.reminders,
  lists: state.lists,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: AppProps
): LinkDispatchProps => ({
  // handleAddReminder: bindActionCreators(handleAddReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
