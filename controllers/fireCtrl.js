const util = require('../helpers/util')
require('dotenv').config()
/*
  teleTransfer => transaction to ACB account & trf to other bank
  inquiryAccount => Inquiry ACB Account name or Other Bank Switching’s Account name
  inquiryAccountBalance => Inquiry balance for Nostro’s Account
  inquiryTransaction => Provides service to Inquiry Transaction that has been submitted before.
*/
const authentication = {
  "CorporateID": process.env.CORPORATE_ID,
  "AccessCode": process.env.ACCESS_CODE,
  "BranchCode": process.env.BRANCH_CODE,
  "UserID": process.env.USER_ID,
  "LocalID": process.env.LOCAL_ID
}

const teleTransfer = (req, res) => {
  if (typeof req.body.FirstName === 'undefined') res.send({err:'FirstName harus diisi'})
  else if (typeof req.body.Address1 === 'undefined') res.send({err:'Address1 harus diisi'})
  else if (typeof req.body.City === 'undefined') res.send({err:'City harus diisi'})
  else if (typeof req.body.SenderCountryID === 'undefined') res.send({err:'SenderCountryID harus diisi'})
  else if (typeof req.body.Name === 'undefined') res.send({err:'BeneficiaryName harus diisi'})
  else if (typeof req.body.BeneficiaryCountryID === 'undefined') res.send({err:'BeneficiaryCountryID harus diisi'})
  else if (typeof req.body.BankCodeType === 'undefined') res.send({err:'BankCodeType harus diisi'})
  else if (typeof req.body.BankCodeValue === 'undefined') res.send({err:'BankCodeValue harus diisi'})
  else if (typeof req.body.BankCountryID === 'undefined') res.send({err:'BankCountryID harus diisi'})
  else if (typeof req.body.AccountNumber === 'undefined') res.send({err:'AccountNumber harus diisi'})
  else if (typeof req.body.CurrencyID === 'undefined') res.send({err:'CurrencyID harus diisi'})
  else if (typeof req.body.Amount === 'undefined') res.send({err:'Amount harus diisi'})
  else if (typeof req.body.PurposeCode === 'undefined') res.send({err:'PurposeCode harus diisi'})
  else if (typeof req.body.DetailOfCharges === 'undefined') res.send({err:'DetailOfCharges harus diisi'})
  // else if (typeof req.body.FormNumber === 'undefined') res.send({err:'FormNumber harus diisi'})

  let teleData = {
    "Authentication": authentication,
    "SenderDetails": {
      "FirstName": req.body.FirstName,
      "Address1": req.body.Address1,
      "City": req.body.City,
      "CountryID": req.body.CountryID
    },
    "BeneficiaryDetails": {
      "Name": req.body.Name,
      "CountryID": req.body.BeneficiaryCountryID,
      "BankCodeType": req.body.BankCodeType,
      "BankCodeValue": req.body.BankCodeValue,
      "BankCountryID": req.body.BankCountryID,
      "AccountNumber": req.body.AccountNumber
    },
    "TransactionDetails": {
      "CurrencyID": req.body.CurrencyID,
      "Amount": req.body.Amount,
      "PurposeCode": req.body.PurposeCode,
      "DetailOfCharges": req.body.DetailOfCharges,
      "FormNumber": `${new Date().toISOString()}_FRM`,//req.body.FormNumber
      'Description1': req.body.Description1 || '',
      'Description2': req.body.Description2 || '',
      'SourceOfFund': req.body.SourceOfFund || ''
    }
  }

  axios.post(`${process.env.API_URL}/fire/transactions/to-account`, teleData)
  .then((err,result) => {
    res.send(err? {err: err} : result)
  })
}

const inquiryAccount = (req, res) => {
  if (typeof req.body.BankCodeType === 'undefined') res.send({err:"BankCodeType harus diisi"})
  else if (typeof req.body.BankCodeValue === 'undefined') res.send({err:"BankCodeValue harus diisi"})
  else if (typeof req.body.AccountNumber === 'undefined') res.send({err:"AccountNumber harus diisi"})
  else {
    let data = {
      "Authentication": authentication,
      "BeneficiaryDetails": {
          "BankCodeType": req.body.BankCodeType,
          "BankCodeValue": req.body.BankCodeValue,
          "AccountNumber": req.body.AccountNumber
      }
    }
    axios.post(`${process.env.API_URL}/fire/accounts`, data)
    .then((err,result) => {
      res.send(err? {err: err} : result)
    })
  }
}

const inquiryAccountBalance = (req, res) => {
  if (typeof req.body.AccountNumber === 'undefined') res.send({err:"AccountNumber harus diisi"})
  else {
    let data = {
      "Authentication": authentication,
      "FIDetails": { "AccountNumber": req.body.AccountNumber }
    }
    axios.post(`${process.env.API_URL}/fire/accounts/balance`, data)
    .then((err,result) => {
      res.send(err? {err: err} : result)
    })
  }
}

const inquiryTransaction = (req, res) => {
  if (typeof req.body.InquiryBy === 'undefined') res.send({err:"InquiryBy harus diisi"})
  else if (typeof req.body.InquiryValue === 'undefined') res.send({err:"InquiryValue harus diisi"})
  else {
    let data = {
      "Authentication": authentication,
      "TransactionDetails": {
        "InquiryBy": req.body.InquiryBy,
        "InquiryValue": req.body.InquiryValue
      }
    }
    axios.post(`${process.env.API_URL}/fire/transactions`, data)
    .then((err,result) => {
      res.send(err? {err: err} : result)
    })
  }
}

module.exports = {
  teleTransfer,
  inquiryAccount,
  inquiryAccountBalance,
  inquiryTransaction
}