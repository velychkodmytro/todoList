import React, { Component } from 'react';

import './todo-list-item.css';


export default class TodoListItem extends Component {

  // state = {
  //   done: false,
  //   important: false,            state не нужен, потому что информация про done, important
  // };                             идет уже не от самого файла todo-list-item
  //                                а сверху от компонента APP
  // onLabelClick = () => {
  //   this.setState( ({done}) => {
  //     return{
  //       done: !done
  //     };
  //   });                       Done, Important прошлые версии, до того как стали
  //                             cвязанны с компонентов APP
  // };

  // onMarkImportant = () => {
  //   this.setState( ({important}) => {
  //     return{
  //       important: !important
  //     };
  //   });
  // }

  render() {

    const { label, onDeleted, onToggleImportant, onToggleDone, important, done, onToggleDeleted } = this.props;
    // const { done, important } = this.state;  cтарая версия state

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }
    return (
      <span className={classNames} >
        <span
          className="todo-list-item-label"

          onClick={onToggleDone} >
          {label}

        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
