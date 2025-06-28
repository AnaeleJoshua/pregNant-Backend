const { Router } = require('express')
const router = Router()
const ultrasoundController = require('./controller/ultrasoundController')
const authId = require('../authorization/auth')

router.post('/:patientId',authId.auth, ultrasoundController.newUltrasound)
router.get('/:patientId', authId.auth,ultrasoundController.getUltrasound)
router.put('/update/:patientId',authId.auth, ultrasoundController.updateUltrasound)
router.delete('/delete/:patientId',authId.auth, ultrasoundController.deleteUltrasound)

module.exports = router
