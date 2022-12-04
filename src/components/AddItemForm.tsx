import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddCircle} from '@mui/icons-material';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

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
      <TextField
        onChange={onNewTitleChangeHandler}
        value={title}
        onKeyDown={onEnterDownAddItem}
        className={error ? 'error' : ''}
        variant={'outlined'}
        size={'small'}
        label={'Title'}
        error={error}
        helperText={error && 'Title is required!'}
      />
      <IconButton onClick={addTask}>
        <AddCircle
          color={'primary'}
        />
      </IconButton>
    </div>
  );
};