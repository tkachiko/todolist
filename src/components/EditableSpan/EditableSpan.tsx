import React, {ChangeEvent, memo, useCallback, useState} from 'react'
import TextField from '@mui/material/TextField'

type EditableSpanPropsType = {
  value: string
  onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.value)

  const setEditModeOn = useCallback((): void => setIsEditMode(true), [])
  const setEditModeOff = useCallback((): void => {
    setIsEditMode(false)
    props.onChange(title)
  }, [props, title])
  const onNewTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value)
  }, [])
  const onEnterDownSave = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setEditModeOff()
    }
  }, [setEditModeOff])

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
      : <span onDoubleClick={setEditModeOn}>{props.value}</span>
  )
})