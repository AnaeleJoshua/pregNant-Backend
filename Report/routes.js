const { Router } = require('express')
const router = Router()
const reportController = require('./Controller/reportController')
const { getUltrasound } = require('../Ultrasound/controller/ultrasoundController')
const authId = require('../authorization/auth')

router.get('/ultrasound/:patientId',[authId.auth,authId.ultrasoundRouteAuth], getUltrasound)
router.get('/foetal_age/:patientId',[authId.auth,authId.ultrasoundRouteAuth], reportController.getFoetalAge)
router.get('/foetal_weight/:patientId',[authId.auth,authId.ultrasoundRouteAuth], reportController.getFoetalWeight)
router.get('/conception_date/:patientId',[authId.auth,authId.ultrasoundRouteAuth], reportController.getConceptionDate)
router.get('/delivery_date/:patientId', [authId.auth,authId.ultrasoundRouteAuth],reportController.getEstimatedDeliveryDate)
router.get('/pregnancy/:patientId', [authId.auth,authId.ultrasoundRouteAuth],reportController.getPregnancyReport)

module.exports = router
