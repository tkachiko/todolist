import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type TodolistsType = {
  id: string
  title: string
  filter: FilterType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TaskStateType = {
  [todolistId: string]: Array<TaskType>
}
export type FilterType = 'all' | 'active' | 'completed'

const App: React.FC = () => {
  const todolistId_1 = v1();
  const todolistId_2 = v1();
  const [todolists, setTodolists] = useState<Array<TodolistsType>>(
    [
      {id: todolistId_1, title: 'What to learn', filter: 'all'},
      {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ]
  );


  const [tasks, setTasks] = useState<TaskStateType>({
    [todolistId_1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todolistId_2]: [
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Beer', isDone: true},
      {id: v1(), title: 'Toilet paper', isDone: false},
      {id: v1(), title: 'Buckwheat', isDone: false},
      {id: v1(), title: 'Meat', isDone: false},
    ],
  });

  // tasks
  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    });
  };
  const addTask = (todolistId: string, newTaskTitle: string): void => {
    const newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false};
    setTasks({
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]]
    });
  };
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
    });
  };
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)
    });
  };

  //todolists
  const addTodolist = (title: string): void => {
    const newTodolistId: string = v1();
    const newTodolist: TodolistsType = {
      id: newTodolistId,
      title,
      filter: 'all'
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({[newTodolistId]: [], ...tasks});
  };
  const removeTodolist = (todolistId: string): void => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete (tasks[todolistId]);
  };
  const changeTodolistFilter = (filter: FilterType, todolistId: string): void => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl));
  };
  const changeTodolistTitle = (title: string, todolistId: string): void => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl));
  };

  const getFilteredTasks = (task: Array<TaskType>, filter: FilterType): Array<TaskType> => {
    let tasksForTodolist = task;
    if (filter === 'active') {
      tasksForTodolist = task.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
      tasksForTodolist = task.filter(t => t.isDone);
    }
    return tasksForTodolist;
  };

  const todolist = todolists.map(tl => {
    const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter);
    return (
      <Todolist
        key={tl.id}
        todolistId={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={filteredTasks}
        removeTask={removeTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        changeTodolistFilter={changeTodolistFilter}
        changeTodolistTitle={changeTodolistTitle}
        removeTodolist={removeTodolist}
        changeTaskTitle={changeTaskTitle}
      />);
  });

  return (
    <div className="App">
      <div>
        <div>
          <AddItemForm addItem={addTodolist}/>
          {todolist}
        </div>
      </div>
    </div>
  );
};

export default App;
