import React, { Component } from 'react'

import { TableItem } from '../../components'

import './Machines.style.css'

class MachinesScreen extends Component {

  constructor() {
    super()
    this.state = {
      machines: [
        {
          id: 1,
          name: 'Torno CNC',
          code: 'AJDH23-1323DS',
          dhcreated: '05/08/2019',
          status: 'alert'
        },
        {
          id: 2,
          name: 'Fresadora CNC',
          code: 'AJDH23-1W3SDS',
          dhcreated: '05/04/2019',
          status: 'warn'
        },
        {
          id: 3,
          name: 'Torno mecânico',
          code: 'AJASF23-1323DS',
          dhcreated: '05/10/2019',
          status: 'warn'
        },
        {
          id: 4,
          name: 'Torno CNC',
          code: 'AJDH23-1323DS',
          dhcreated: '05/08/2019',
          status: 'normal'
        },
        {
          id: 5,
          name: 'Fresadora CNC',
          code: 'AJDH23-1W3SDS',
          dhcreated: '05/04/2019',
          status: 'normal'
        },
        {
          id: 6,
          name: 'Torno mecânico',
          code: 'AJASF23-1323DS',
          dhcreated: '05/10/2019',
          status: 'normal'
        }
      ]
    }
  }

  onVerLogsClick(machineId){
    window.location.replace(`/logs/${machineId}`)
  }

  renderMachines = () => {
    return this.state.machines.map(machine => (<TableItem object={machine}>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Nome: </span> {machine.name}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Código: </span> {machine.code}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Data de fabricação: </span> {machine.dhcreated}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Status: </span> {machine.status == 'warn' ? 'Alerta' : machine.status == 'alert' ? 'Crítico' : 'Normal'}
      </div>
      <button className='showLogsButton' onClick={() => this.onVerLogsClick(machine.id)}>Ver logs</button>
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
