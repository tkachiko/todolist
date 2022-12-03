import React, {ChangeEvent, useState} from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const errorMessage = error ? <div className="errorMessage">Title is required!</div> : null;

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
    error && setError(false);
  };
  const addTask = (): void => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== '') {
      props.addItem(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle('');
  };
  const onEnterDownAddItem = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div>
      <input
        onChange={onNewTitleChangeHandler}
        value={title}
        onKeyDown={onEnterDownAddItem}
        className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {errorMessage}
    </div>
  );
};