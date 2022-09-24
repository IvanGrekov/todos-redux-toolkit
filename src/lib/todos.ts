import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './api';
import { ITodo } from '../types';

export const getTodos = (options: AxiosRequestConfig<any> = {}) =>
    axios({
        ...options,
        url: `${BASE_URL}/todos`,
    }).then((res) => res.data);

export const addTodo = (newTodoTitle: string) => {
    const newTodo = {
        id: Math.random() * Math.random(),
        title: newTodoTitle,
        completed: false,
    };

    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    return axios({
        method: 'POST',
        url: `${BASE_URL}/todos`,
        headers,
        data: newTodo,
    }).then((res) => res.data);
};

export const changeTodo = (changingTodo: ITodo) => {
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    return axios({
        method: 'PATCH',
        url: `${BASE_URL}/todos/${changingTodo.id}`,
        headers,
        data: changingTodo,
    }).then((res) => res.data);
};

export const deleteTodo = (todoId: string) =>
    axios({
        method: 'DELETE',
        url: `${BASE_URL}/todos/${todoId}`,
    });
