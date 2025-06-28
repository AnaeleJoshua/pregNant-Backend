const { Router } = require('express')
const router = Router()
const patientController = require('./controller/patientController')
const authId = require('../authorization/auth')

router.post('/newPatient', patientController.newPatient)
router.get('/all', patientController.getAllPatient)
router.route('/:patientId').get([authId.auth],patientController.getPatient).put([authId.auth],patientController.updatePatient).delete([authId.auth],patientController.deletePatient)

module.exports = router
