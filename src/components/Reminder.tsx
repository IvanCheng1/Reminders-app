import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteReminder,
  handleEditReminder,
  handleSetReminder,
  ReminderActionTypes,
} from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { IReminder } from "../store/reducers/remindersReducer";

interface IProps {
  r: IReminder;
  list: string;
}

interface IState {
  edit: boolean;
  newReminder: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Reminder extends React.Component<Props, IState> {
  wrapper: React.RefObject<any>;
  input: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.wrapper = React.createRef();
    this.input = React.createRef<HTMLInputElement>();
  }

  state: IState = {
    edit: false,
    newReminder: "",
  };

  setReminder = () => {
    this.props.handleSetReminder(this.props.r, this.props.list);
  };

  deleteReminder = () => {
    this.props.handleDeleteReminder(this.props.r);
    document.removeEventListener("click", this.handleClickOutside);
  };

  editReminder = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({ newReminder: value });
  };

  onEditReminder = (): void => {
    this.setState({
      edit: true,
      newReminder: this.props.r.reminder,
    });

    document.addEventListener("click", this.handleClickOutside);
    this.forceUpdate(this.focusOnInput);
  };

  focusOnInput = () => {
    const node = this.input.current;
    if (node) {
      node.focus();
    }
  };

  onSaveReminder = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    this.props.handleEditReminder(
      this.state.newReminder,
      this.props.r.reminder,
      this.props.list
    );

    if (e) {
      this.setState({
        edit: false,
        newReminder: "",
      });
    }

    document.removeEventListener("click", this.handleClickOutside);
  };

  handleClickOutside = (e: MouseEvent) => {
    if (this.wrapper && !this.wrapper.current?.contains(e.target)) {
      if (this.state.newReminder !== this.props.r.reminder) {
        this.onSaveReminder();
      } else {
        this.setState({
          edit: false,
          newReminder: "",
        });
      }
      document.removeEventListener("click", this.handleClickOutside);
    }
  };

  render() {
    const { r } = this.props;
    const { edit } = this.state;

    return (
      <>
        <li ref={this.wrapper}>
          <input
            type="checkbox"
            onChange={() => this.setReminder()}
            checked={r.completed}
          />

          {edit ? (
            <>
              <form onSubmit={this.onSaveReminder}>
                <input
                  value={this.state.newReminder}
                  onChange={this.editReminder}
                  ref={this.input}
                />
                <input type="submit" value="Save" />
              </form>
              <button onClick={this.deleteReminder}>delete</button>
            </>
          ) : (
            <>
              <div
                className="reminder-name"
                onDoubleClick={this.onEditReminder}
              >
                {r.reminder}
              </div>
            </>
          )}
        </li>
      </>
    );
  }
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleSetReminder: (reminder: IReminder, list: string) => void;
  handleDeleteReminder: (reminder: IReminder) => void;
  handleEditReminder: (
    newReminder: string,
    oldReminder: string,
    list: string
  ) => void;
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
  handleEditReminder: bindActionCreators(handleEditReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
