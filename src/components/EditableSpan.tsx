import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
  title: string
  changeTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title);

  const setEditModeOn = (): void => setIsEditMode(true);
  const setEditModeOff = (): void => {
    setIsEditMode(false);
    props.changeTitle(title);
  };
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };
  const onEnterDownSave = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setEditModeOff();
    }
  };

  return (
    isEditMode
      ? <TextField
        value={title}
        autoFocus
        onBlur={setEditModeOff}
        onKeyDown={onEnterDownSave}
        onChange={onNewTitleChangeHandler}
        size={'small'}
        variant={'standard'}
      />
      : <span onDoubleClick={setEditModeOn}>{props.title}</span>
  );
};