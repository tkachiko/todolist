import React from 'react';
import {FilterType, TaskType} from '../App';

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: number) => void
  changeFilter: (value: FilterType) => void
}

export const Todolist = (props: PropsType) => {
  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => <li key={task.id}>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={() => props.removeTask(task.id)}>✖</button>
        </li>)}
      </ul>
      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};
