import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from '../App';

type PropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterType
  removeTask: (id: string) => void
  addTask: (newTaskTitle: string) => void
  changeFilter: (value: FilterType) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<PropsType> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const getTasksListItem = (t: TaskType) => {
    const removeTask = () => props.removeTask(t.id);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);

    return (
      <li key={t.id}
          className={t.isDone ? 'isDone' : 'notIsDone'}
      >
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={changeTaskStatusHandler}
        />
        <span>{t.title}</span>
        <button onClick={removeTask}>✖</button>
      </li>
    );
  };

  const tasksList = props.tasks.length
    ? <ul>{props.tasks.map(getTasksListItem)}</ul>
    : <span>Your task list is empty :(</span>

  const addTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== '') {
      props.addTask(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle('');
  };
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
    error && setError(false);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  const onAllClickHandler = (): void => props.changeFilter('all');
  const onActiveClickHandler = (): void => props.changeFilter('active');
  const onCompletedClickHandler = (): void => props.changeFilter('completed');

  const errorMessage = error ? <div className="errorMessage">Title is required!</div> : null;

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <input
          onChange={onNewTitleChangeHandler}
          value={title}
          onKeyDown={onKeyDownHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>
      {tasksList}
      <div>
        <button
          onClick={onAllClickHandler}
          className={props.filter === 'all' ? 'activeBtn btn' : 'btn'}
        >All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={props.filter === 'active' ? 'activeBtn btn' : 'btn'}
        >Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={props.filter === 'completed' ? 'activeBtn btn' : 'btn'}
        >Completed
        </button>
      </div>
    </div>
  );
};
