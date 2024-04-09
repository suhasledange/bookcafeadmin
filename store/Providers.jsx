'use client'
import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import UserProvider from './UserProvider'
const Providers = ({children}) => {
  return (
          <Provider store={store}>
            <UserProvider>
            {children}
            </UserProvider>
          </Provider>
  )
}

export default Providers
