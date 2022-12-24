import {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddCircle from '@mui/icons-material/AddCircle'

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = memo((props) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value)
    error && setError('Title is required')
  }
  const addItem = (): void => {
    if (title.trim() !== '') {
      props.addItem(title.trim())
    } else {
      setError('Title is required')
    }
    setTitle('')
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error) setError(null)
    if (e.key === 'Enter') {
      addItem()
    }
  }

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
  )
})