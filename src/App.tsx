import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

const App: React.FC = () => {
  const todolistTitle = 'What to learn';
  const [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Rest API', isDone: false},
    {id: v1(), title: 'GraphQL', isDone: false},
  ]);

  const [filter, setFilter] = useState<FilterType>('all');

  const removeTask = (id: string) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };
  const addTask = (newTaskTitle: string): void => {
    const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false};
    setTasks([newTask, ...tasks]);
  };
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    let task: Array<TaskType> =
      tasks.map(task => task.id === taskId ? {...task, isDone} : task);
    setTasks(task);
  };
  const changeFilter = (value: FilterType): void => {
    setFilter(value);
  };

  const getFilteredTasks = (t: Array<TaskType>, f: FilterType) => {
    let tasksForTodolist = t;
    if (f === 'active') {
      tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (f === 'completed') {
      tasksForTodolist = tasks.filter(t => t.isDone);
    }
    return tasksForTodolist;
  };

  return (
    <div className="App">
      <div>
        <div>
          <Todolist
            title={todolistTitle}
            tasks={getFilteredTasks(tasks, filter)}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
