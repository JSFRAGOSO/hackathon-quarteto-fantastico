import React, { Component } from 'react'

import axios from 'axios'

import { TableItem } from '../../components'

import './Machines.style.css'

class MachinesScreen extends Component {

  constructor() {
    super()
    this.state = {
      machines: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8002/machines').then(resp => {
      console.log(resp)
      this.setState({
        machines: resp.data
      })
    })
  }

  onVerLogsClick(machineId){
    window.location.replace(`/logs/${machineId}`)
  }

  renderMachines = () => {
    return this.state.machines.reverse().map(machine => (<TableItem object={machine}>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Nome: </span> {machine.name}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Código: </span> {machine.code}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Data de fabricação: </span> {machine.manufactureyear}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Status: </span> {machine.status == 'Em risco' ? 'Alerta' : machine.status == 'CRITICO' ? 'Crítico' : 'Normal'}
      </div>
      <button className='showLogsButton' onClick={() => this.onVerLogsClick(machine.idmachine)}>Ver logs</button>
    </TableItem>))
  }

  render() {
    return (
      <div className='machinesContainer'>
        <h1 className='machinesContainer__title'>Suas Máquinas</h1>
        <div className='machinesContainer__tableContainer'>
          {this.renderMachines()}
        </div>
      </div>
    )
  }
}

export { MachinesScreen }
