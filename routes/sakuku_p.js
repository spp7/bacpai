'use strict'
const express = require('express')
let router = express.Router()


const sakukuPCtrl = require('../controllers/sakukuPCtrl')

router.post('/createUser', sakukuPCtrl.createUser) //v
router.get('/userInquiry/:CompanyCode/:PrimaryID', sakukuPCtrl.userInquiry) //v
router.put('/userUpdate', sakukuPCtrl.userUpdate) //v
router.put('/createTopup', sakukuPCtrl.createTopup) //v
router.get('/topupInquiry/:CompanyCode/:PrimaryID', sakukuPCtrl.topupInquiry) //v
router.get('/transactionInquiry/:CompanyCode/:PrimaryID', sakukuPCtrl.transactionInquiry) //v
router.post('/generateOTP', sakukuPCtrl.generateOTP) //v
router.post('/transferCompanyAccount', sakukuPCtrl.transferCompanyAccount) //v
router.get('/transferCompanyAccountInquiry/:CompanyCode/:PrimaryID', sakukuPCtrl.transferCompanyAccountInquiry) //v


module.exports  = router