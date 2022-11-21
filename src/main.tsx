import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './_App'
import './styles/main.scss'
import { Provider } from 'react-redux'
import { store } from '@store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
