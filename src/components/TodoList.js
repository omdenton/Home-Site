import React, { Component } from 'react';
import TodoForm from '../TodoForm';
import Todo from './Todo';

export default class TodoList extends Component {
  state = {
    todos: [],
    todosToShow: 'All',
    toggleAllComplete: true,
  };

  render() {
    let todos = [];
    switch (this.state.todosToShow) {
      case 'Active':
        todos = this.state.todos.filter((todo) => !todo.complete);
        break;
      case 'Complete':
        todos = this.state.todos.filter((todo) => todo.complete);
        break;
      default:
        todos = this.state.todos;
        break;
    }

    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={() => this.handleDeleteTodo(todo.id)}
            toggleComplete={() => this.toggleComplete(todo.id)}
          />
        ))}
        <div> todos left : {this.state.todos.filter((todo) => !todo.complete).length}</div>
        <div>
          <button onClick={() => this.updateTodoToShow('All')}>All</button>
          <button onClick={() => this.updateTodoToShow('Active')}>Active</button>
          <button onClick={() => this.updateTodoToShow('Complete')}>Complete</button>
        </div>

        {this.state.todos.filter((todo) => todo.complete).length ? (
          //conditional formatting if there are complete items.
          <div>
            <button onClick={() => this.removeComplete()}>Remove Complete</button>
          </div>
        ) : null}
        <div>
          <button onClick={() => this.toggleAllComplete()}>
            Toggle All Complete : {`${!this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }

  addTodo = (todo) => {
    //dont wanna mutate the state, so want to create a copy of our empty array, add an item to the start, and reassign
    this.setState({ todos: [todo, ...this.state.todos] });
  };

  updateTodoToShow = (string) => {
    this.setState({ todosToShow: string });
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          //update, copy everything from todo but change complete value, as above with the array
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      }),
    });
  };

  handleDeleteTodo = (id) => {
    this.setState({ todos: this.state.todos.filter((todo) => todo.id !== id) });
  };

  removeComplete = () => {
    let todos = this.state.todos.filter((todo) => !todo.complete);
    this.setState({ todos: todos });
  };

  toggleAllComplete = () => {
    this.setState({
      todos: this.state.todos.map((todo) => ({
        ...todo,
        complete: this.state.toggleAllComplete,
      })),
      toggleAllComplete: !this.state.toggleAllComplete,
    });
  };
}
