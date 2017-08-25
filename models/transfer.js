const mongoose = require('mongoose')
const Schema = mongoose.Schema
let transferSchema = new Schema({
  SenderDetails: {
    FirstName: {type: String, default: ''},
    LastName: {type: String, default: ''},
    DateOfBirth: String,
    Address1: String,
    Address2: String,
    City: String,
    StateID: String,
    PostalCode: String,
    CountryID: String,
    Mobile: String,
    IdentificationType: String,
    IdentificationNumber: String,
    AccountNumber: String
  },
  BeneficiaryDetails: {
    Name: String,
    DateOfBirth: String,
    Address1: String,
    Address2: String,
    City: String,
    StateID: String,
    PostalCode: String,
    CountryID: String,
    Mobile: String,
    IdentificationType: String,
    IdentificationNumber: String,
    NationalityID: String,
    Occupation: String,
    BankCodeType: String,
    BankCodeValue: String,
    BankCountryID: String,
    BankAddress: String,
    BankCity: String,
    AccountNumber: String,
    ServerBeneAccountName: {type: String, default: 'ServerBeneAccountName'}
  },
  TransactionDetails: {
    CurrencyID: String,
    Amount: String,
    PurposeCode: String,
    Description1: String,
    Description2: String,
    SourceOfFund: String,
    FormNumber: { type: String, unique: true },
    ReferenceNumber: { type: String, default: `${Date.now()}_REFNUM`},
    ReleaseDateTime: { type: Date, default: Date.now() },
  },
  StatusTransaction: { type: String, default: '1111'},
  StatusMessage: { type: String, default: 'Success'}

})

let Transfer = mongoose.model('Transfer',transferSchema)

module.exports = Transfer