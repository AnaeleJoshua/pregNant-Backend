const PatientModel = require('../../common/model/Patient')
const { filterObject } = require('../../utility/utility') // returns an object containing properties other than the array of properties passed as am array into it

module.exports = {
  newPatient: async (req, res) => {
    const payload = req.body
    const returnProperties = ['address', 'updatedAt', 'createdAt', 'age']
    try {
      const createdPatient = await PatientModel.createPatient(payload)
      const filteredObject = filterObject(createdPatient.toJSON(), returnProperties)
      return res.status(200).json({
        status: 'sucess',
        data: filteredObject
      })
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  getPatient: async (req, res) => {
    const patientId = req.params.patientId
    // array of object properties to be returned as respo
    const returnProperties = ['address', 'updatedAt', 'createdAt']
    console.log(req.params)
    try {
      const patient = await PatientModel.findPatient({ patientId })
      const filteredObject = filterObject(patient.toJSON(), returnProperties)
      return res.status(200).json({
        status: 'success',
        data: filteredObject
      })
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  getAllPatient: async (req, res) => {
    try {
      const patients = await PatientModel.findAllPatients({ attributes: { exclude: ['createdAt', 'updatedAt', 'age'] } }) // {exclude:['createdAt','updatedAt','patientId','age']} {attributes:['firstName','lastName']}
      console.log('patients',patients)

      return res.status(200).json({
        status: 'success',
        data: patients
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  updatePatient: async (req, res) => {
    try {
      const patientId = req.params.patientId
      const payload = req.body
      const updatedPatient = await PatientModel.updatePatient(payload, { patientId })// payload,{
      // return res.status(200).json({
      //   status: true,
      //   data: 'Profile updated' // updatedPatient.toJSON()
      // })
      if (updatedPatient[0] === 0){
        return res.status(400).json({
          status: false,
          data: `invalid request`
        }
      )}
      return res.status(200).json({
        status: true,
        data: 'Profile updated succesfully'
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  deletePatient: (req, res) => {
    try {
      const patientId = req.params.patientId
      const deletedPatient = PatientModel.deletePatient({ patientId })
      return res.status(200).json({
        status: 'deleted',
        data: `patient ${patientId} has been successfully deleted`
      })
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err
      })
    }
  }
}
