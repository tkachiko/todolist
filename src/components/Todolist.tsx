import React from 'react';
import {TasksType} from '../App';

type PropsType = {
  title: string
  tasks: TasksType[]
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
        {props.tasks.map(task => <li key={task.id}>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
        </li>)}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
