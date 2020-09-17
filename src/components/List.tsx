import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteList,
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

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

const List = ({
  handleChangeList,
  handleDeleteList,
  handleDeleteRemindersFromList,
  list,
  currentList,
  reminders,
}: Props) => {
  const deleteList = () => {
    handleDeleteList(list);
    handleChangeList();

    // delete reminders from that list!
    handleDeleteRemindersFromList(list.name);
  };

  return (
    <>
      <div className={
            currentList === list.name ? "list-holder active" : "list-holder"
          }>
        <button
          className="list-button"
          onClick={() => handleChangeList(list.name)}
        >
          {list.name}
        </button>
        {/* <button onClick={() => deleteList()}>Delete</button> */}
        <div className="vertical-align">
          {reminders.reminders.filter((r) => r.for === list.name).length}
        </div>
      </div>
    </>
  );
};

interface LinkStateProps {
  reminders: remindersState;
}

interface LinkDispatchProps {
  handleDeleteList: (list: IList) => void;
  handleDeleteRemindersFromList: (list: string) => void;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
