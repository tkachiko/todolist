import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';
import {IconButton, TextField} from '@mui/material';
import {AddCircle} from '@mui/icons-material';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: 'Button clicked inside form'
    },
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
  addItem: action('Button clicked')
};

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string | null>('Title is required');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
    error && setError('Title is required');
  };
  const addItem = (): void => {
    if (title.trim() !== '') {
      args.addItem(title.trim());
    } else {
      setError('Title is required');
    }
    setTitle('');
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error) setError(null);
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div>
      <TextField
        onChange={onChangeHandler}
        value={title}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
        variant={'outlined'}
        size={'small'}
        label={'Title'}
        error={!!error}
        helperText={error && 'Title is required!'}
      />
      <IconButton onClick={addItem}>
        <AddCircle
          color={'primary'}
        />
      </IconButton>
    </div>
  );
};

export const AddItemFormStoryWithErrorStory = TemplateWithError.bind({});
