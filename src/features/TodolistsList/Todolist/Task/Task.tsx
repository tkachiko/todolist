import {Checkbox, IconButton, ListItem} from '@mui/material'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import RemoveCircle from '@mui/icons-material/RemoveCircle'
import {ChangeEvent, FC, memo} from 'react'
import {removeTaskTC, updateTaskTC} from '../../tasks-reducer'
import {RequestStatusType, TaskStatuses, TaskType} from '../../../../types/types'
import {useAppDispatch} from '../../../../app/hooks'

type TaskPropsType = {
  task: TaskType
  todolistId: string
  entityStatus: RequestStatusType
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId, entityStatus}) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskTC(task.id, todolistId))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = (e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    dispatch(updateTaskTC(todolistId, task.id, {status}))
  }
  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC(todolistId, task.id, {title}))
  }

  const isDone = task.status === TaskStatuses.Completed

  return (
    <ListItem
      key={task.id}
      className={isDone ? 'isDone' : 'notIsDone'}
      style={{
        padding: '0px',
        justifyContent: 'space-between',
        textDecoration: isDone ? 'line-through' : 'none',
      }}
    >
      <Checkbox
        checked={isDone}
        onChange={changeTaskStatus}
        size={'small'}
      />
      <EditableSpan value={task.title}
                    onChange={changeTaskTitle} />
      <IconButton onClick={removeTask}
                  disabled={entityStatus === 'loading'}
      >
        <RemoveCircle
          color={entityStatus === 'loading' ? 'disabled' : 'secondary'}
          fontSize={'small'}
        />
      </IconButton>
    </ListItem>
  )
})