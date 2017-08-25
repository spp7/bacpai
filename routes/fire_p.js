'use strict'
const express = require('express')
let router = express.Router()


const firePCtrl = require('../controllers/firePCtrl')

router.post('/teleTransfer', firePCtrl.teleTransfer) //v
router.post('/inquiryAccount', firePCtrl.inquiryAccount) //v
// router.post('/inquiryAccountBalance', firePCtrl.inquiryAccountBalance)
router.post('/inquiryTransaction', firePCtrl.inquiryTransaction) //v

module.exports  = router