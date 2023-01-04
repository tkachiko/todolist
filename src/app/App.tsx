import {FC, useEffect} from 'react'
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
import {useAppDispatch, useAppSelector} from './hooks'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {RequestStatusType} from '../types/types'
import {Login} from '../features/Login/Login'
import {Navigate, Route, Routes} from 'react-router-dom'
import {initializeAppTC, logoutTC} from '../features/Login/auth-reducer'
import {CircularProgress} from '@mui/material'

type PropsType = {
  demo?: boolean
}

export const App: FC<PropsType> = ({demo = false}) => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC())
    }
  }, [])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress />
    </div>
  }

  const handleLogout = () => {
    dispatch(logoutTC())
  }

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
          {isLoggedIn && <Button
            color={'inherit'}
            variant={'outlined'}
            onClick={handleLogout}
          >Log out</Button>}
        </Toolbar>
        {status === 'loading' && <LinearProgress color={'secondary'} />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistsList demo={demo} />} />
          <Route path={'/login'} element={<Login />} />
          <Route path="/404" element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
      </Container>
    </div>
  )
}

