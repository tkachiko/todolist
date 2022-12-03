import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  filter: FilterType
  removeTask: (taskId: string, todolistId: string) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTodolistFilter: (filter: FilterType, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

  const getTasksListItem = (t: TaskType) => {
    const removeTask = () => props.removeTask(t.id, props.todolistId);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todolistId);

    return (
      <li key={t.id}
          className={t.isDone ? 'isDone' : 'notIsDone'}
      >
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
        <button onClick={removeTask}>✖</button>
      </li>
    );
  };

  const tasksList = props.tasks.length
    ? <ul>{props.tasks.map(getTasksListItem)}</ul>
    : <span>Your task list is empty :(</span>;
  const handlerCreator = (filter: FilterType) => () => {
    props.changeTodolistFilter(filter, props.todolistId);
  };
  const addTask = (title: string) => {
    props.addTask(props.todolistId, title);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.todolistId);
  };
  const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todolistId);

  return (
    <div>
      <div>
        <h3>
          <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
          <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
      </div>
      {tasksList}
      <div>
        <button
          onClick={handlerCreator('all')}
          className={props.filter === 'all' ? 'activeBtn btn' : 'btn'}
        >All
        </button>
        <button
          onClick={handlerCreator('active')}
          className={props.filter === 'active' ? 'activeBtn btn' : 'btn'}
        >Active
        </button>
        <button
          onClick={handlerCreator('completed')}
          className={props.filter === 'completed' ? 'activeBtn btn' : 'btn'}
        >Completed
        </button>
      </div>
    </div>
  );
};
