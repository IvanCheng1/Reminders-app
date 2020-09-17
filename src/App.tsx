import React from "react";
import { connect } from "react-redux";
import { rootState } from "./store/reducers";
import "./App.css";

import { remindersState } from "./store/reducers/remindersReducer";
import { ReminderActionTypes } from "./store/actions/remindersActions";
import { ThunkDispatch } from "redux-thunk";
import ListInput from "./components/ListInput";
import { listState } from "./store/reducers/listReducer";
import List from "./components/List";
import RemindersHolder from "./components/RemindersHolder";

interface IProps {}

interface IState {
  currentList: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class App extends React.Component<Props, IState> {
  state: IState = {
    currentList: "",
  };

  componentDidMount() {
    // set default list if available
    if (this.props.lists.lists.length > 0) {
      this.setState({
        currentList: this.props.lists.lists[0].name,
      });
    }
  }

  updateCurrentList = (newList: string): void => {
    // for ListInput

    this.setState({
      currentList: newList,
    });
  };

  handleChangeList = (nameOfList?: string): void => {
    // for List
    let listToSet: string;

    if (nameOfList) {
      // argument provided => change to that list
      listToSet = nameOfList;
    } else if (this.props.lists.lists.length > 1) {
      // no argument => change to the first list if available
      listToSet = this.props.lists.lists[0].name;
    } else {
      // no more lists
      listToSet = "";
    }

    this.setState({
      currentList: listToSet,
    });
  };

  render() {
    const { reminders, lists } = this.props;
    const { currentList } = this.state;
    return (
      <div className="App">
        <h1>Reminders</h1>
        <div className="main-holder">
          <div className="side-bar">
            <ListInput
              updateCurrentList={this.updateCurrentList}
              currentList={currentList}
            />

            <div className="lists-holder">
              {lists.lists.map((l) => (
                <List
                  key={l.name}
                  handleChangeList={this.handleChangeList}
                  list={l}
                  currentList={currentList}
                />
              ))}
            </div>
          </div>
          <RemindersHolder currentList={currentList} />
        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  reminders: remindersState;
  lists: listState;
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  reminders: state.reminders,
  lists: state.lists,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
