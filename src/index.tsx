import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {App} from './app/App'
import {BrowserRouter} from 'react-router-dom'

let theme = createTheme({
  palette: {
    primary: {
      main: '#ec407a',
    },
    secondary: {
      main: '#4db6ac',
    },
    error: {
      main: '#d32f2f',
    },
    mode: 'light',
  },
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <BrowserRouter>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
