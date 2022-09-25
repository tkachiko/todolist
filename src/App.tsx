import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export type TasksType = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  const tasks: TasksType[] = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 3, title: 'Rest API', isDone: false},
    {id: 3, title: 'GraphQL', isDone: false},
  ];

  return (
    <div className="App">
      <div>
        <div>
          <Todolist title={'What to learn'} tasks={tasks}/>
        </div>
      </div>
    </div>
  );
}

export default App;
