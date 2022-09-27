import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppContainer from './containers/AppContainer'
import { GlobalStyle } from './globals.styles'
import './index.less'

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
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <AppContainer />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
