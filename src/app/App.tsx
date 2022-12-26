import {FC} from 'react'
import './App.css'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/icons-material/Menu'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppSelector} from './hooks'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {RequestStatusType} from '../types/types'

type PropsType = {
  demo?: boolean
}

export const App: FC<PropsType> = ({demo = false}) => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const error = useAppSelector(state => state.app.error)
  return (
    <div className="App">
      {error && <ErrorSnackbar />}
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton
            edge={'start'}
            color={'inherit'}
            aria-label={'menu'}
            sx={{mr: 2}}
          >
            <Menu />
          </IconButton>
          <Typography
            variant={'h6'}
            component={'div'}
            sx={{flexGrow: 1}}
          >
            Todolists
          </Typography>
          <Button
            color={'inherit'}
            variant={'outlined'}
          >Login</Button>
        </Toolbar>
        {status === 'loading' && <LinearProgress color={'secondary'} />}
      </AppBar>
      <Container fixed>
        <TodolistsList demo={demo} />
      </Container>
    </div>
  )
}

