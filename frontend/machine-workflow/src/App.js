import React from 'react';

import { Route } from 'react-router-dom'

import { MachinesScreen, LogsScreen } from './pages'
import { Header } from './components/index.js'

function App() {
  return (
    <>
      <Header />
      <Route component={MachinesScreen} path='/' exact/>
      <Route component={LogsScreen} path='/logs/:machineId' />
    </>
  )
}

export default App;
