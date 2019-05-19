const { Pool, Client } = require('pg')
const connectionString = 'postgressql://postgres:1234@localhost:5432/machineworkflow'
const client = new Client({
    connectionString: connectionString
})

client.connect()

const db = client.query('SELECT * FROM machine', (err, res) => {
    client.end()
    return { xax: 'ahshas' }
})

module.exports = { db }
