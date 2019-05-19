import React, { PureComponent } from 'react';

import axios from 'axios'

import { TableItem, Graph } from '../../components'

class LogsScreen extends PureComponent {

  constructor() {
    super()

    this.state = {
      logs: [ ],

      showLog: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8002/machineLog/${ window.location.pathname.substr(window.location.pathname.length - 4, window.location.pathname.length)}`).then(resp => {
      console.log(resp)
      this.setState({
       logs: resp.data
      })
    })
  }
  
  onVerLogsClick = () => {
    this.setState({
      showLog: !this.state.showLog
    })
  }

  renderMachines = () => {
    return this.state.logs.reverse().map(log => (<TableItem object={log}>
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Data do log: </span> {log.dhcreated}
      </div>
      {log.vibration && <div className='tableItem__field'>
        <span className='tableItem__atribute'>Vibração: </span> {log.vibration}
      </div>}
      {log.temperature && <div className='tableItem__field'>
        <span className='tableItem__atribute'>Temperatura: </span> {log.temperature}
      </div>}
      {log.timecicle &&  <div className='tableItem__field'>
        <span className='tableItem__atribute'>Tempo do clico: </span> {log.timecicle}
      </div>}
      <div className='tableItem__field'>
        <span className='tableItem__atribute'>Status: </span> {log.status == 'Em risco' ? 'Alerta' : log.status == 'CRITICO' ? 'Crítico' : 'Normal'}
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