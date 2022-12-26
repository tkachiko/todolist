import {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddCircle from '@mui/icons-material/AddCircle'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({addItem, disabled = false}) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value)
    error && setError('Title is required')
  }
  const addItemHandler = (): void => {
    if (title.trim() !== '') {
      addItem(title.trim())
    } else {
      setError('Title is required')
    }
    setTitle('')
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error) setError(null)
    if (e.key === 'Enter') {
      addItemHandler()
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
        disabled={disabled}
      />
      <IconButton onClick={addItemHandler}
                  disabled={true}>
        <AddCircle
          color={disabled ? 'disabled' : 'primary'}
        />
      </IconButton>
    </div>
  )
})