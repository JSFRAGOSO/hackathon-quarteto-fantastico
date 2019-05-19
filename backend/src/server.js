const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
var client = {}

function connectDb(){
    
    const connectionString = 'postgressql://postgres:ops4ever@localhost:5432/machineworkflow'

    client = new Client({
        connectionString: connectionString
    })

    client.connect()
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/machines', (req, res) => {
    connectDb()
    client.query('SELECT * FROM machine', (err, resp) => {
        res.send(resp.rows)
        client.end()
    })
})

app.post('/log', (req,res) => {
    connectDb()
    client.query(`INSERT INTO log (id, idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege)
                                values (1,1,'2019-05-19',10,'',20,'${req.body.id}',NULL,'')`, (err, resp) => {
        client.end()
        res.send({err,resp})
   })
})

app.get('/validaTemperatura/:codMachine/:temperature', (req, res) => {
    var codMachine = req.params.codMachine;
    var temp = req.params.temperature;
    console.log(codMachine)
    console.log(temp)
    connectDb()
    var max = client.query(`SELECT maximum FROM machine 
    JOIN machine_limits ON machine.idmachine = machine_limits.idmachine
    JOIN limits ON machine_limits.idlimit = limits.idlimits
    WHERE machine.idmachine = ${codMachine}
    AND txtype = 'Temperatura'
    LIMIT 1`, (err, resp) => {
        res.send(max)
        client.end()
    })

})

app.listen(8002)
