'use strict'
const express = require('express')
let router = express.Router()


const fireCtrl = require('../controllers/fireCtrl')

router.post('/teleTransfer', fireCtrl.teleTransfer)
router.post('/inquiryAccount', fireCtrl.inquiryAccount)
router.post('/inquiryAccountBalance', fireCtrl.inquiryAccountBalance)
router.post('/inquiryTransaction', fireCtrl.inquiryTransaction)

module.exports  = router