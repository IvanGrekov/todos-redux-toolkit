import { BASE_URL } from './api';
import { ITodo } from '../types';

export const getTodos = (options?: RequestInit) => (
  fetch(`${BASE_URL}/todos`, options).then((res) => res.json())
);

export const addTodo = (newTodoTitle: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: Math.random() * Math.random(),
      title: newTodoTitle,
      completed: false,
    }),
  }

  return (
    fetch(`${BASE_URL}/todos`, options)
      .then((res) => res.json())
  );
};

export const changeTodo = (changingTodo: ITodo) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(changingTodo),
  }

  return (
    fetch(`${BASE_URL}/todos/${changingTodo.id}`, options)
      .then((res) => res.json())
  );
};

export const deleteTodo = (todoId: string) => {
  const options = {
    method: 'DELETE',
  }

  return (
    fetch(`${BASE_URL}/todos/${todoId}`, options)
      .then((res) => res.json())
  );
};
