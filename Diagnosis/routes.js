const { Router } = require('express')
const authId = require('../authorization/auth')
const router = Router()
const DiagnosisController = require('./controller/diagnosisController')

router.post('/:patientId',[authId.auth], DiagnosisController.newDiagnosis)
router.get('/:patientId',[authId.auth,authId.DiagnosisRouteAuth], DiagnosisController.getDiagnosis)
router.put('/update/:patientId',[authId.auth,authId.DiagnosisRouteAuth], DiagnosisController.updateDiagnosis)
router.delete('/delete/:patientId',[authId.auth,authId.DiagnosisRouteAuth], DiagnosisController.deleteDiagnosis)

module.exports = router
