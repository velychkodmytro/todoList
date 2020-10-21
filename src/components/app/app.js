import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


export default class App extends Component {


  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffe'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filter: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      isShow: true,
    };
  };

  deleteItem = (id) => {

    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray
      };
    });
  };

  addElement = (text) => {

    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {

      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    // 1. update object
    const oldItem = arr[idx];

    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    // 2. construct new array
    return [
      ...arr.slice(0, idx),    // удаляется старый элемент
      newItem,                      // на его место подставляется точно такой же, только
      ...arr.slice(idx + 1)    // с измененным свойством done
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onSearchChange = (term) => {
    this.setState({ term });
  }
  // searchItem = label => {

  //   const oldItems = this.state.todoData;
  //   for(const task of oldItems) {
  //     if(task.label.includes(label) || label === ''){
  //       task.isShow = true;
  //     } else{
  //       task.isShow = false;  
  //     }
  //   }
  //   this.setState({
  //     todoData: oldItems,
  //   })
  // }



  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData
      .filter(elem => elem.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            // searchItem={this.searchItem} 
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm
          addElement={this.addElement} />
      </div>
    );
  };
};


