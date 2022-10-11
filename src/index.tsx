import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import AppContainer from './containers/AppContainer'
import { GlobalStyle } from './globals.styles'
import './index.less'
import { store } from './store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <AppContainer />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
