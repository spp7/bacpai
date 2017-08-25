require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

let sakuku = require('./routes/sakuku')
let sakuku_p = require('./routes/sakuku_p')
let fire = require('./routes/fire')
let fire_p = require('./routes/fire_p')

let env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000
const db_config = {
  'development' : 'mongodb://localhost/apiBCA',
  'test': 'mongodb://localhost/apiBCA_tes',
  'production': ''
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.use('/api/sakuku', sakuku)
app.use('/api/sakuku_p', sakuku_p)
app.use('/api/fire', fire)
app.use('/api/fire_p', fire_p)

mongoose.connect(db_config[env], (err,res) => {
  console.log(err ? err : `Connected to ${db_config[env]}`)
})

app.set('port', port)
app.listen(app.get('port'), () => {
  console.log(`Connected to port ${app.get('port')}`)
})

module.exports = app