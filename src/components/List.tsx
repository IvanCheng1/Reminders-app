import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteList,
  handleEditList,
  ListActionTypes,
} from "../store/actions/listActions";
import {
  handleDeleteRemindersFromList,
  handleEditListForReminders,
} from "../store/actions/remindersActions";
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
  wrapper: React.RefObject<any>;
  input: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.wrapper = React.createRef();
    this.input = React.createRef<HTMLInputElement>();
  }

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

    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("keydown", this.escChar);
    this.forceUpdate(this.focusOnInput);
  };

  focusOnInput = () => {
    const node = this.input.current;
    if (node) {
      node.focus();
    }
  };

  handleClickOutside = (e: MouseEvent) => {
    if (this.wrapper && !this.wrapper.current?.contains(e.target)) {
      if (this.state.newList !== this.props.list.name) {
        this.onSaveList();
      } else {
        this.setState({
          edit: false,
          newList: "",
        });
        document.removeEventListener("click", this.handleClickOutside);
      }
    }
  };

  editList = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({ newList: value });
  };

  onSaveList = (e?: React.FormEvent<HTMLFormElement>): void => {
    if (e) e.preventDefault();

    // change list fo reminders
    this.props.handleEditListForReminders(
      this.state.newList,
      this.props.list.name
    );
    // save list to store
    this.props.handleEditList(this.state.newList, this.props.list.name);
    // update default list
    this.props.handleChangeList(this.state.newList);
    // setstate
    if (e) {
      this.setState({
        edit: false,
        newList: "",
      });
    }

    // remove click listener
    document.removeEventListener("click", this.handleClickOutside);
  };

  escChar = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      document.removeEventListener("keydown", this.escChar);
      document.removeEventListener("click", this.handleClickOutside);

      this.setState({
        edit: false,
        newList: "",
      });
    }
  };

  render() {
    const { currentList, list, handleChangeList, reminders } = this.props;
    return (
      <>
        <div
          ref={this.wrapper}
          className={
            currentList === list.name ? "list-holder active" : "list-holder"
          }
          onClick={() => handleChangeList(list.name)}
        >
          {this.state.edit ? (
            <div className="list-name">
              <form onSubmit={this.onSaveList}>
                <input
                  type="text"
                  value={this.state.newList}
                  onChange={this.editList}
                  ref={this.input}
                />
                {/* <input type="submit" value="Save" /> */}
              </form>
              <button className="cross" onClick={this.deleteList} />
            </div>
          ) : (
            <div
              className="list-name vertical-align"
              onDoubleClick={this.onEditList}
            >
              {list.name}
            </div>
          )}
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
  handleEditListForReminders: (newList: string, oldList: string) => void;
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
  handleEditListForReminders: bindActionCreators(
    handleEditListForReminders,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
