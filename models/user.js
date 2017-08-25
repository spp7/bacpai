const mongoose = require('mongoose')
const Schema = mongoose.Schema
let userSchema = new Schema({
  CustomerName: String,
  DateOfBirth: String,
  PrimaryID: {
    type: String,
    unique: true,
    lowercase: true
  },
  MobileNumber: String,
  EmailAddress: String,
  CompanyCode: String,
  CustomerNumber: String,
  IDNumber: String
})

let User = mongoose.model('User',userSchema)

module.exports = User