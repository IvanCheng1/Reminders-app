import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { handleAddList, ListActionTypes } from "../store/actions/listActions";
import { rootState } from "../store/reducers";
// import { useDispatch } from "react-redux";
// import { handleAddReminder } from "../store/actions/remindersActions";

interface ListInputProps {}

type Props = ListInputProps & LinkStateProps & LinkDispatchProps;

function ListInput({ handleAddList }: Props) {
  const [list, setList] = React.useState("");

  const updateList = (e: ChangeEvent<HTMLInputElement>): void => {
    setList(e.target.value);
  };

  const addList = (): void => {
    // dispatch(handleAddReminder(reminder));
    // handleClickAddReminder(list);
    handleAddList(list)
    setList("");
  };

  return (
    <>
      <div>
        <h6>list input</h6>
        <input
          onChange={updateList}
          value={list}
          type="text"
          name="list"
          placeholder="list name"
        />
        <button onClick={addList}>add list</button>
      </div>
    </>
  );
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleAddList: (nameOfList: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: ListInputProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ListActionTypes>,
  ownProps: ListInputProps
): LinkDispatchProps => ({
  handleAddList: bindActionCreators(handleAddList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListInput);
