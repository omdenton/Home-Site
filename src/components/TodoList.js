import React, { Component } from 'react';
import TodoForm from '../TodoForm';

export default class TodoList extends Component {
  state = {
    todos: [],
  };

  render() {
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {this.state.todos.map((todo) => (
          <div key={todo.id}> {todo.text} </div>
        ))}
      </div>
    );
  }

  addTodo = (todo) => {
    //dont wanna mutate the state, so want to create a copy of our empty array, add an item to the start, and reassign
    this.setState({ todos: [todo, ...this.state.todos] });
  };
}
