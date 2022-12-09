import React, {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
  title: 'API'
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    todolistAPI.getTodolist()
      .then(res => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.createTodolist('Lessssssssoooooon')
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = 'aca8c892-48df-477d-8bea-3aa6bb7b7980';
    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = '67d2f4c2-f667-4bf2-889f-339357868c64';
    todolistAPI.updateTodolist(todolistId, 'what to wear')
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

