import React, {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
  title: 'API'
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolist()
      .then(res => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>('');

  const createTodolist = () => {
    todolistAPI.createTodolist(title)
      .then(res => {
        setState(res.data);
      });
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'Todolist title'}
             type="text"
             value={title}
             onChange={e => setTitle(e.currentTarget.value)}
      />
      <button onClick={createTodolist}>create todolist</button>
    </div>
  </div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
        setState(res.data);
      });
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'Todolist id'}
             type="text"
             value={todolistId}
             onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={deleteTodolist}>delete todolist</button>
    </div>
  </div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('');

const updateTodolistTitle = () => {
  todolistAPI.updateTodolist(todolistId, title)
    .then(res => {
      setState(res.data);
    });
}
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'Todolist id'}
             type="text"
             value={todolistId}
             onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <input placeholder={'Todolist title'}
             type="text"
             value={title}
             onChange={e => setTitle(e.currentTarget.value)}
      />
      <button onClick={updateTodolistTitle}>update title</button>
    </div>
</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('')

  const getTasks = () => {
    todolistAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data);
      });
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'Todolist id'}
             type="text"
             value={todolistId}
             onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={getTasks}>get tasks</button>
    </div>
  </div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('');

  const createTask = () => {
    todolistAPI.createTask(todolistId, title)
      .then(res => {
        setState(res.data);
      });
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'Todolist id'}
             type="text"
             value={todolistId}
             onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <input placeholder={'Task title'}
             type="text"
             value={title}
             onChange={e => setTitle(e.currentTarget.value)}
      />
      <button onClick={createTask}>create task</button>
    </div>
  </div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId)
      .then(res => {
        setState(res.data);
      });
  };
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'Todolist id'}
             type="text"
             value={todolistId}
             onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <input placeholder={'Task id'}
             type="text"
             value={taskId}
             onChange={e => setTaskId(e.currentTarget.value)}
      />
      <button onClick={deleteTask}>delete task</button>
    </div>
  </div>;
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('title 1');
  const [description, setDescription] = useState<string>('description 1');
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const updateTask = () => {
    todolistAPI.updateTask(todolistId, taskId, {
      description,
      title,
      status,
      priority,
      startDate,
      deadline
    })
      .then(res => {
        setState(res.data);
      });
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'Todolist id'}
             type="text"
             value={todolistId}
             onChange={e => setTodolistId(e.currentTarget.value)}
      />
      <input placeholder={'Task id'}
             type="text"
             value={taskId}
             onChange={e => setTaskId(e.currentTarget.value)}
      />
      <input placeholder={'Task title'}
             type="text"
             value={title}
             onChange={e => setTitle(e.currentTarget.value)}
      />
      <input placeholder={'Description'}
             type="text"
             value={description}
             onChange={e => setDescription(e.currentTarget.value)}
      />
      <input type="number"
             value={status}
             onChange={e => setStatus(+e.currentTarget.value)}
      />
      <input type="number"
             value={priority}
             onChange={e => setPriority(+e.currentTarget.value)}
      />
      <button onClick={updateTask}>update task</button>
    </div>
  </div>;
};