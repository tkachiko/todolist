import React, {FC, useCallback, useEffect} from 'react'
import {TodolistDomainType} from '../../types/types'
import {addTodolistTC, fetchTodolistsTC} from './todolists-reducer'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {Navigate} from 'react-router-dom'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: FC<PropsType> = ({demo = false}) => {
  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const addTodolist = useCallback((title: string): void => {
    dispatch(addTodolistTC(title))
  }, [dispatch])

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTC())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Grid container style={{padding: '20px 0'}}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          return <Grid
            item
            key={tl.id}>
            <Paper
              elevation={16}
              style={{maxWidth: '280px', width: '100%', margin: '20px', padding: '20px'}}
            >
              <Todolist todolist={tl} demo={demo} />
            </Paper>
          </Grid>
        })}
      </Grid>
    </>
  )

}