const mongoose = require('mongoose')
const Schema = mongoose.Schema
let transactionSchema = new Schema({
  PrimaryID: String,
  CompanyCode: String,
  AccountStatementID: Number,
  TransactionDate: String,
  TransactionType: String,
  Amount: String,
  CurrencyCode: String,
  Description: String,
  CurrentBalance: String,
  TransactionID: {
    type: String,
    default: `${Date.now()}`
  },
  BCAReferenceID: {
    type: String,
    default: Date.now()+'_REFID'
  }
})

let Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction