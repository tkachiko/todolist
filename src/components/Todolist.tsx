import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from '../App';

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  addTask: (newTaskTitle: string) => void
  changeFilter: (value: FilterType) => void
}

export const Todolist: React.FC<PropsType> = (props) => {

  const [title, setTitle] = useState<string>('');

  const addTask = () => {
    props.addTask(title);
    setTitle('');
  };
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  const onAllClickHandler = (): void => props.changeFilter('all');
  const onActiveClickHandler = (): void => props.changeFilter('active');
  const onCompletedClickHandler = (): void => props.changeFilter('completed');

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <input onChange={onNewTitleChangeHandler}
               value={title}
               onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {

          const onRemoveHandler = (): void => props.removeTask(task.id);

          return <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={onRemoveHandler}>✖</button>
          </li>;
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
};
