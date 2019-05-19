import React, { PureComponent } from 'react';

import { TableItem, Graph } from '../../components'

class LogsScreen extends PureComponent {

  constructor() {
    super()

    this.state = {
      logs: [
        {
          name: 'JJDHEH2334HJ23332',
          idmachine: 1,
          dhcreated: '19/05/2019',
          vibration: 4000,
          vibrationmessage: '',
          temperature: 90,
          temperaturemessage: '',
          timecicle: 100,
          timecliclemessage: '',
          status: 'warn'
        },
        {
          name: 'JJDHEH2334HJ23332',
          idmachine: 1,
          dhcreated: '19/05/2019',
          vibration: 4000,
          vibrationmessage: '',
          temperature: 90,
          temperaturemessage: '',
          timecicle: 100,
          timecliclemessage: '',
          status: 'alert'
        },
        {
          name: 'JJDHEH2334HJ23332',
          idmachine: 1,
          dhcreated: '19/05/2019',
          vibration: 4000,
          vibrationmessage: '',
          temperature: 90,
          temperaturemessage: '',
          timecicle: 100,
          timecliclemessage: '',
          status: ''
        },
        {
          name: 'JJDHEH2334HJ23332',
          idmachine: 1,
          dhcreated: '19/05/2019',
          vibration: 4000,
          vibrationmessage: '',
          temperature: 90,
          temperaturemessage: '',
          timecicle: 100,
          timecliclemessage: '',
          status: ''
        }
      ],

      showLog: false
    }
  }

  onVerLogsClick = () => {
    this.setState({
      showLog: !this.state.showLog
    })
  }

  renderMachines = () => {
    return this.state.logs.map(log => (<TableItem object={log}>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Data do log: </span> {log.dhcreated}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Vibração: </span> {log.vibration}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Temperatura: </span> {log.temperature}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Tempo do clico: </span> {log.timecicle}
      </div>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Status: </span> {log.status == 'warn' ? 'Alerta' : log.status == 'alert' ? 'Crítico' : 'Normal'}
      </div>
    </TableItem>))
  }

  render() {
    return (
      <div className='machinesContainer'>
        <h1 className='machinesContainer__title'>Logs da máquina</h1>
        <button className='showLogsButton' onClick={this.onVerLogsClick}>{this.state.showLog ? 'Ver gráficos' : 'Ver logs'}</button>
        {this.state.showLog ?
        <div className='machinesContainer__tableContainer'>
          {this.renderMachines()}
        </div> :
        <>
        <h2>Temperatura</h2>
        <Graph />
        <h2>Quantidade de ciclos</h2>
        <Graph />
        <h2>Vibrações</h2>
        <Graph />
        </>}
      </div>
    );
  }
}

export { LogsScreen }