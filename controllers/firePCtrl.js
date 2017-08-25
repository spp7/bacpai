const mongoose = require('mongoose')
require('dotenv').config()

const util = require('../helpers/util')
const Transfer = require('../models/transfer')

/*
  teleTransfer => transaction to ACB account & trf to other bank
  inquiryAccount => Inquiry ACB Account name or Other Bank Switching’s Account name
  inquiryAccountBalance => Inquiry balance for Nostro’s Account , bank luar negri ga usah
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
  // if (typeof req.body.CorporateID === 'undefined') res.send({err:'CorporateID harus diisi'})
  // else if (typeof req.body.AccessCode === 'undefined') res.send({err:'AccessCode harus diisi'})
  // else if (typeof req.body.BranchCode === 'undefined') res.send({err:'BranchCode harus diisi'})
  // else if (typeof req.body.UserID === 'undefined') res.send({err:'UserID harus diisi'})
  // else if (typeof req.body.LocalID === 'undefined') res.send({err:'LocalID harus diisi'})
  if (typeof req.body.FirstName === 'undefined') res.send({err:'FirstName harus diisi'})
  else if (typeof req.body.Address1 === 'undefined') res.send({err:'Address1 harus diisi'})
  else if (typeof req.body.City === 'undefined') res.send({err:'City harus diisi'})
  else if (typeof req.body.SenderCountryID === 'undefined') res.send({err:'SenderCountryID harus diisi'})
  else if (typeof req.body.BeneficiaryName === 'undefined') res.send({err:'BeneficiaryName harus diisi'})
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
  // {
  //   'Authentication':{
  //       'CorporateID':'ABNMAE',
  //       'AccessCode':'z2eWHxbYSLFE72UKugZJ',
  //       'BranchCode':'ABNMAE01',
  //       'UserID':'ABAEOPR1',
  //       'LocalID':'ABAECTR'
  //   },
  //   'SenderDetails':{
  //       'FirstName':'John',
  //       'LastName':'Doe',
  //       'DateOfBirth':'',
  //       'Address1':'HILLS STREET 1',
  //       'Address2':'',
  //       'City':'HOLLYWOOD',
  //       'StateID':'',
  //       'PostalCode':'',
  //       'CountryID':'US',
  //       'Mobile':'',
  //       'IdentificationType':'',
  //       'IdentificationNumber':'',
  //       'AccountNumber':''
  //   }, 'BeneficiaryDetails':{
  //       'Name':'Sam',
  //       'DateOfBirth':'',
  //       'Address1':'',
  //       'Address2':'',
  //       'City':'',
  //       'StateID':'',
  //       'PostalCode':'',
  //       'CountryID':'ID',
  //       'Mobile':'',
  //       'IdentificationType':'',
  //       'IdentificationNumber':'',
  //       'NationalityID':'',
  //       'Occupation':'',
  //       'BankCodeType':'BIC',
  //       'BankCodeValue':'CENAIDJAXXX',
  //       'BankCountryID':'ID',
  //       'BankAddress':'',
  //       'BankCity':'',
  //       'AccountNumber':'010203040506'
  //   }, 'TransactionDetails':{
  //       'CurrencyID':'IDR',
  //       'Amount':'1415001.00',
  //       'PurposeCode':'011',
  //       'Description1':'',
  //       'Description2':'',
  //       'DetailOfCharges':'SHA',
  //       'SourceOfFund':'',
  //       'FormNumber':'RT254 ID1'
  //   }
  // }
  let teleData = {
    'Authentication': authentication,
    'SenderDetails': {
      'FirstName': req.body.FirstName,
      'Address1': req.body.Address1,
      'City': req.body.City,
      'CountryID': req.body.CountryID
    },
    'BeneficiaryDetails': {
      'Name': req.body.BeneficiaryName,
      'CountryID': req.body.BeneficiaryCountryID,
      'BankCodeType': req.body.BankCodeType,
      'BankCodeValue': req.body.BankCodeValue,
      'BankCountryID': req.body.BankCountryID,
      'AccountNumber': req.body.AccountNumber
    },
    'TransactionDetails': {
      'CurrencyID': req.body.CurrencyID,
      'Amount': req.body.Amount,
      'PurposeCode': req.body.PurposeCode,
      'DetailOfCharges': req.body.DetailOfCharges,
      'FormNumber': `${new Date().toISOString()}_FRM`, //biarunik
      'Description1': req.body.Description1 || '',
      'Description2': req.body.Description2 || '',
      'SourceOfFund': req.body.SourceOfFund || ''
    }
  }
  let rnd = Math.floor(Math.random()*2)+1

  if (rnd === 2) {
    teleData.StatusMessage = 'Failed'
    teleData.StatusTransaction = '0000'
  }

  let transfer = new Transfer(teleData)

  transfer.save((err, ntransfer) => {
    if (err) res.send({err: err})
    else res.send({
      'BeneficiaryDetails': {
        'Name': ntransfer.BeneficiaryDetails,
        'AccountNumber': ntransfer.AccountNumber,
        'ServerBeneAccountName': ntransfer.ServerBeneAccountName
      },
      'TransactionDetails': ntransfer.TransactionDetails,
      'StatusTransaction': ntransfer.StatusTransaction,
      'StatusMessage': ntransfer.StatusMessage
    })
  })

  // {
  //   'BeneficiaryDetails':
  //   {
  //       'Name':'Sam',
  //       'AccountNumber':'010203040506',
  //       'ServerBeneAccountName':'MARGARETH TACHER BINTI SOLOMON TITU'
  //   },
  //   'TransactionDetails':
  //   {
  //       'CurrencyID':'IDR',
  //       'Amount':'1415001.00',
  //       'PurposeCode':'011',
  //       'Description1':'',
  //       'Description2':'',
  //       'FormNumber':'RT254 ID1',
  //       'ReferenceNumber':'ABNMAE01000INA16040000198',
  //       'ReleaseDateTime':'2016-04-26T10:31:55+07:00'
  //   },
  //   'StatusTransaction':'0000',
  //   'StatusMessage':'Success'
  // }
}

const inquiryAccount = (req, res) => {
  // {
  //   'Authentication':{
  //       'CorporateID':'POSTID',
  //       'AccessCode':'jSvazuvEnz2mavv1wj6L',
  //       'BranchCode':'POSTID01',
  //       'UserID':'OPRPOS1',
  //       'LocalID':'2370000'
  //   },
  //   'BeneficiaryDetails':{
  //       'BankCodeType':'BIC',
  //       'BankCodeValue':'CENAIDJAXXX',
  //       'AccountNumber':'0106666011'
  //   }
  // }
  if (typeof req.body.BankCodeType === 'undefined') res.send({err:'BankCodeType harus diisi'})
  else if (typeof req.body.BankCodeValue === 'undefined') res.send({err:'BankCodeValue harus diisi'})
  else if (typeof req.body.AccountNumber === 'undefined') res.send({err:'AccountNumber harus diisi'})
  else {
    Transfer.findOne(
      {
        'BeneficiaryDetails.BankCodeType': req.body.BankCodeType,
        'BeneficiaryDetails.BankCodeValue': req.body.BankCodeValue,
        'BeneficiaryDetails.AccountNumber': req.body.AccountNumber
      },
      (err, transfer) => {
        if (err) res.send({err: err})
        else
          res.send({
            'BeneficiaryDetails': {
              'ServerBeneAccountName' : transfer.BeneficiaryDetails.ServerBeneAccountName
            },
            'StatusTransaction': transfer.StatusTransaction,
            'StatusMessage': transfer.StatusMessage
          })
      }
    )
    // {
    //   'BeneficiaryDetails': {
    //     'ServerBeneAccountName':'Sam'
    //   },
    //   'StatusTransaction':'0000',
    //   'StatusMessage':'Success'
    // }
  }
}

const inquiryTransaction = (req, res) => {
  // {
  //   'Authentication':{
  //       'CorporateID':'ABNMAE',
  //       'AccessCode':'z2eWHxbYSLFE72UKugZJ',
  //       'BranchCode':'ABNMAE01',
  //       'UserID':'ABAEOPR1',
  //       'LocalID':'LOCINQ'
  //   },
  //   'TransactionDetails':{
  //       'InquiryBy':'F',
  //       'InquiryValue':'CT17 IDR3A'
  //   }
  // }
  if (typeof req.body.InquiryBy === 'undefined') res.send({err:'InquiryBy harus diisi'})
  else if (typeof req.body.InquiryValue === 'undefined') res.send({err:'InquiryValue harus diisi'})
  else {
    let search = ''
    switch(req.body.InquiryBy) {
      // case 'N': break
      case 'F':
        search = 'TransactionDetails.FormNumber'
        break
      case 'B':
        search = 'TransactionDetails.ReferenceNumber'
        break
    }

    Transfer.findOne(
      {[search]: req.body.InquiryValue},
      (err, transfer) => {
        if (err) res.send({err: err})
        else
          res.send(transfer)
          // res.send({
          //   'SenderDetails': {
          //     'FirstName': transfer.SenderDetails.FirstName || '',
          //     'LastName': transfer.SenderDetails.LastName || ''
          //   },
          //   'BeneficiaryDetails': {
          //     'Name': transfer.BeneficiaryDetails.Name || '',
          //     'BankCodeType': transfer.BeneficiaryDetails.BankCodeType || '',
          //     'BankCodeValue': transfer.BeneficiaryDetails.BankCodeValue || '',
          //     'AccountNumber': transfer.BeneficiaryDetails.AccountNumber || ''
          //   },
          //   'TransactionDetails': {
          //     'AmountPaid': transfer.TransactionDetails.Amount || '',
          //     'CurrencyID': 'IDR',
          //     'ReleaseDateTime': transfer.TransactionDetails.ReleaseDateTime,
          //     'LocalID': authentication.LocalID,
          //     'FormNumber': transfer.TransactionDetails.FormNumber,
          //     'ReferenceNumber': transfer.TransactionDetails.ReferenceNumber,
          //     'PIN': 'PINPALSU',
          //     'Description1': transfer.TransactionDetails.Description1,
          //     'Description2': transfer.TransactionDetails.Description2
          //   },
          //   'StatusTransaction': transfer.StatusTransaction,
          //   'StatusMessage': transfer.StatusMessage
          // })
      }
    )
  }
}

module.exports = {
  teleTransfer,
  inquiryAccount,
  inquiryTransaction
}