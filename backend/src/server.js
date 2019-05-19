const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
var client = {}

function connectDb(){
    
    const connectionString = 'postgressql://postgres:1234@localhost:5432/machineworkflow'

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
    client.query(`INSERT INTO log (id, idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege,status)
                                values (1,1,'2019-05-19',10,'',20,'${req.body.id}',NULL,'','NORMAL')`, (err, resp) => {
       console.log(err,resp)
        client.end()
        res.send({succsess: req.body.id})
   })
})

app.get('/machineLog/:codMachine', (req,res) => {
    var codMachine = req.params.codMachine;
    connectDb()
    client.query(`SELECT * FROM log WHERE idmachine = ${codMachine}`, (err, resp) => {
        res.send(resp.rows)
        client.end()
   })
})


app.get('/validaTemperatura/:codMachine/:temperature', (req, res) => {
    var codMachine = req.params.codMachine;
    var temp = req.params.temperature;
    

    connectDb()
    client.query(`SELECT * FROM machine 
    JOIN machine_limits ON machine.idmachine = machine_limits.idmachine
    JOIN limits ON machine_limits.idlimit = limits.idlimits
    WHERE machine.idmachine = ${codMachine}
    AND txtype = 'Temperatura'
    LIMIT 1`, (err, resp) => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        //console.log(resp.rows[0].maximum)
        var idMachine = resp.rows[0].idmachine 
        
        
        if (temp >= resp.rows[0].minimum && temp <= resp.rows[0].maximum){
            client.query(`INSERT INTO log (idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege,status)
                                values (${idMachine},'${dateTime}',NULL,'',${temp},'',NULL,'','NORMAL')`, (err, resp) => {})
                                
                                res.send({succsess:"succsess"})
                                
                                
        }else{
            client.query(`INSERT INTO log (idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege,status)
                                values (${idMachine},'${dateTime}',NULL,'',${temp},'Temperatura fora dos limites',NULL,'','CRITICO')`, (err, resp) => {})
                                res.send({Erro:"Temperatura fora dos limites"})
        }

        
        client.end()
    })

})

app.get('/validaVibracoes/:codMachine/:vibration', (req, res) => {
    var codMachine = req.params.codMachine;
    var vib = req.params.vibration;
    
    connectDb()
    client.query(`SELECT * FROM machine 
    JOIN machine_limits ON machine.idmachine = machine_limits.idmachine
    JOIN limits ON machine_limits.idlimit = limits.idlimits
    WHERE machine.idmachine = ${codMachine}
    AND txtype = 'Vibração'
    LIMIT 1`, (err, respons) => {

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        var dateTime = date+' '+time;
        
        var idMachine = respons.rows[0].idmachine
        
        console.log(vib)
        console.log(respons.rows[0].minimum)
        console.log(respons.rows[0].maximum)
        // /(vib => resp.rows[0].minimum) && (vib <= resp.rows[0].maximum)
        if (parseFloat(vib) <= parseFloat(respons.rows[0].maximum) && parseFloat(vib) >= parseFloat(respons.rows[0].minimum)){
            client.query(`INSERT INTO log (idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege,status)
                                values (${idMachine},'${dateTime}',${vib},'',NULL,'',NULL,'','NORMAL')`, (err, resp) => {})
                                res.send({succsess:"succsess"})
        }else{
            client.query(`INSERT INTO log (idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege,status)
                                values (${idMachine},'${dateTime}',${vib},'Vibrações fora dos limites',NULL,'',NULL,'','CRITICO')`, (err, resp) => {})
                                res.send({Erro:"Vibrações fora dos limites"})
        }

        
        client.end()
    })

})

app.get('/validaCiclos/:codMachine/:cycles', (req, res) => {
    var codMachine = req.params.codMachine;
    var cic = req.params.cycles;
    
    connectDb()
    client.query(`SELECT * FROM machine 
    JOIN machine_limits ON machine.idmachine = machine_limits.idmachine
    JOIN limits ON machine_limits.idlimit = limits.idlimits
    WHERE machine.idmachine = ${codMachine}
    AND txtype = 'nº ciclos'
    LIMIT 1`, (err, respons) => {

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        var dateTime = date+' '+time;
        
        var idMachine = respons.rows[0].idmachine
        
        console.log(cic)
        console.log(respons.rows[0].minimum)
        console.log(respons.rows[0].maximum)
        // /(vib => resp.rows[0].minimum) && (vib <= resp.rows[0].maximum)
        if (cic <= respons.rows[0].maximum && cic >= respons.rows[0].minimum){
            client.query(`INSERT INTO log (idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege,status)
                                values (${idMachine},'${dateTime}',NULL,'',NULL,'',${cic},'NORMAL')`, (err, resp) => {})
                                res.send({succsess:"succsess"})
        }else{
            client.query(`INSERT INTO log (idmachine, dhcreated, vibration, vibrationmessege, temperature, temperaturemessege, timecicle, timeciclemessege,status)
                                values (${idMachine},'${dateTime}',NULL,'Ciclos fora dos limites',NULL,'',${cic},'CRITICO')`, (err, resp) => {})
                                res.send({Erro:"Ciclos fora dos limites"})
        }

        
        client.end()
    })

})


app.listen(8002)
