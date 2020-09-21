import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteList,
  handleEditList,
  ListActionTypes,
} from "../store/actions/listActions";
import { handleDeleteRemindersFromList } from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { IList } from "../store/reducers/listReducer";
import { remindersState } from "../store/reducers/remindersReducer";

interface IProps {
  handleChangeList: (nameOfList?: string) => void;
  list: IList;
  currentList: string;
}

interface IState {
  edit: boolean;
  newList: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class List extends React.Component<Props, IState> {
  state: IState = {
    edit: false,
    newList: "",
  };

  deleteList = () => {
    this.props.handleDeleteList(this.props.list);
    this.props.handleChangeList();

    // delete reminders from that list!
    this.props.handleDeleteRemindersFromList(this.props.list.name);
  };

  onEditList = (): void => {
    this.setState((prev) => ({
      edit: !prev.edit,
      newList: this.props.list.name,
    }));
  };

  editList = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({ newList: value });
  };

  onSaveList = (): void => {
    // save list to store
    this.props.handleEditList(this.state.newList, this.props.list.name);
    // setstate
    this.setState((prev) => ({
      edit: !prev.edit,
      newList: "",
    }));
  };

  // onDoubleClick = (): void => {
  //   this.setState((prev) => ({
  //     edit: !prev.edit,
  //   }));
  // };

  render() {
    const { currentList, list, handleChangeList, reminders } = this.props;
    return (
      <>
        <div
          className={
            currentList === list.name ? "list-holder active" : "list-holder"
          }
          onClick={() => handleChangeList(list.name)}
        >
          {this.state.edit ? (
            <div className="list-name">
              <input value={this.state.newList} onChange={this.editList} />
              {/* <button>Delete</button> */}
              <button onClick={this.onSaveList}>Save</button>
            </div>
          ) : (
            <div className="list-name" onDoubleClick={this.onEditList}>
              {list.name}
            </div>
          )}
          {/* {this.state.edit ? "editing" : "not editing"} */}
          {/* <button onClick={() => deleteList()}>Delete</button> */}
          {/* <button onClick={this.editClick}>Edit</button> */}
          <div className="vertical-align">
            {reminders.reminders.filter((r) => r.for === list.name).length}
          </div>
        </div>
      </>
    );
  }
}

interface LinkStateProps {
  reminders: remindersState;
}

interface LinkDispatchProps {
  handleDeleteList: (list: IList) => void;
  handleDeleteRemindersFromList: (list: string) => void;
  handleEditList: (newList: string, oldList: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  reminders: state.reminders,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ListActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleDeleteList: bindActionCreators(handleDeleteList, dispatch),
  handleDeleteRemindersFromList: bindActionCreators(
    handleDeleteRemindersFromList,
    dispatch
  ),
  handleEditList: bindActionCreators(handleEditList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
