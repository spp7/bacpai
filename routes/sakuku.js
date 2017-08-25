'use strict'
const express = require('express')
let router = express.Router()


const sakukuCtrl = require('../controllers/sakukuCtrl')

router.post('/createUser', sakukuCtrl.createUser)
router.get('/userInquiry/:CompanyCode/:PrimaryID', sakukuCtrl.userInquiry)
router.put('/userUpdate', sakukuCtrl.userUpdate)
router.put('/createTopup', sakukuCtrl.createTopup)
router.get('/topupInquiry/:CompanyCode/:PrimaryID', sakukuCtrl.topupInquiry)
router.get('/transactionInquiry/:CompanyCode/:PrimaryID', sakukuCtrl.transactionInquiry)
router.post('/generateOTP', sakukuCtrl.generateOTP)
router.post('/transferCompanyAccount', sakukuCtrl.transferCompanyAccount)
router.get('/transferCompanyAccountInquiry/:CompanyCode/:PrimaryID', sakukuCtrl.transferCompanyAccountInquiry)


module.exports  = router