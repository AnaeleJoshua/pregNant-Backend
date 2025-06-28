// const { INTEGER } = require('sequelize')
const DiagnosisModel = require('../../common/model/Diagnosis')
const { filterObject } = require('../../utility/utility')

module.exports = {
  newDiagnosis: async (req, res) => {
    const payload = req.body
    const patientId = req.params.patientId

    try {
      const createdDiagnosis = await DiagnosisModel.createDiagnosis(Object.assign(payload, { patientId }))
      const objectPropExclude = ['patientId', 'diagnosisId', 'createdAt', 'updatedAt']
      const revisedObject = filterObject(createdDiagnosis.toJSON(), objectPropExclude)
      return res.status(200).json({
        status: 'success',
        data: revisedObject
      })
    } catch (err) {
      console.log(`${err}`)
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  getDiagnosis: async (req, res) => {
    const patientId = req.params.patientId
    console.log(patientId)
    try {
      const diagnosis = await DiagnosisModel.findDiagnosis(
        { PatientId: patientId })
      const objectPropExclude = ['patientId', 'diagnosisId', 'createdAt', 'updatedAt']
      const revisedObject = filterObject(diagnosis.toJSON(), objectPropExclude)
      return res.status(200).json({
        status: 'success',
        data: revisedObject
      })
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  // getAllPatient : async (req,res)=>{
  // //   console.log("it got here")
  // //   return res.send('hellooooo')
  //     try {
  //            console.log("it got here")
  //         const patients = await PatientModel.findAllPatients(req.query)
  //         console.log(patients)
  //         return res.status(200).json({
  //             status: 'success',
  //             data:patients.toJSON()
  //         })
  //     }catch(err){
  //         return res.status(500).json({
  //             status : false,
  //             error : err
  //         })
  //     }
  // },
  updateDiagnosis: async (req, res) => {
    try {
      const patientId = req.params.patientId
      const payload = req.body
      const updatedDiagnosis = await DiagnosisModel.updateDiagnosis(payload, {
        patientId
      })
      // console.log(  updatedDiagnosis)
      // return res.status(200).json({
      //   status: true,
      //   data: 'success'
      // })
      if (updatedDiagnosis[0] === 0){
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
      res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  deleteDiagnosis: (req, res) => {
    try {
      const patientId = req.params.patientId
      const deletedDiagnosis = DiagnosisModel.deleteDiagnosis({ patientId })
      return res.status(200).json({
        status: true,
        data: `patient ${patientId} diagnosis has been deleted successfully`
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({
        status: false,
        error: err
      })
    }
  }
}
