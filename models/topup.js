const mongoose = require('mongoose')
const Schema = mongoose.Schema
let topupSchema = new Schema({
  PrimaryID: String,
  TransactionID: String,
  CompanyCode: String,
  RequestDate: String,
  Amount: String,
  CurrencyCode: String,
  
})

let Topup = mongoose.model('Topup',topupSchema)

module.exports = Topup