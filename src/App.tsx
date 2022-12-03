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
  const [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Rest API', isDone: false},
    {id: v1(), title: 'GraphQL', isDone: false},
  ]);

  const removeTask = (id: string) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const addTask = (newTaskTitle: string): void => {
    const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false};
    setTasks([newTask, ...tasks]);
  };

  const [filter, setFilter] = useState<FilterType>('all');

  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => !task.isDone);
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone);
  }

  const changeFilter = (value: FilterType): void => {
    setFilter(value);
  };

  return (
    <div className="App">
      <div>
        <div>
          <Todolist
            title={'What to learn'}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
