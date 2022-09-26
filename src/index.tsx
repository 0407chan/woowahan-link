import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppContainer from './containers/AppContainer'
import './index.css'

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
      <AppContainer />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
