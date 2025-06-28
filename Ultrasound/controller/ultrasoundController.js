const UltrasoundModel = require('../../common/model/Ultrasound')
const { filterObject } = require('../../utility/utility')
const {calculateFoetalAge,calculateFoetalWeight} = require('../../utility/utility')

module.exports = {
  newUltrasound: async (req, res) => {
    const payload = req.body
    const {biparietalDiameter,
      abdominalCircumference,
    } = req.body
    const foetal_weight = calculateFoetalWeight(biparietalDiameter,abdominalCircumference) 
    console.log(foetal_weight)
    const foetal_age  = calculateFoetalAge(foetal_weight)
    console.log(foetal_age)
    const patientId = req.params.patientId
    // payload.patientId = patientId
    try {
      const createdUltrasound = await UltrasoundModel.createUltrasound(Object.assign(payload, { patientId ,foetal_age,foetal_weight}))
      const objectPropExclude = ['patientId', 'ultrasoundId', 'createdAt', 'updatedAt','foetal_age','foetal_weight'] // array of properties to be excluded from response
      const revisedObject = filterObject(createdUltrasound.toJSON(), objectPropExclude) // filterObject returns an object with the given array of propertiesd excluded
      return res.status(200).json({
        status: 'success',
        data: revisedObject
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  getUltrasound: async (req, res) => {
    const patientId = req.params.patientId

    try {
      const ultrasound = await UltrasoundModel.findUltrasound(
        { patientId: patientId })
      console.log(ultrasound.toJSON())
      const objectPropExclude = ['createdAt', 'updatedAt','patientId','ultrasoundId','foetal_weight','foetal_age'] // array of properties to be excluded from response
      const revisedObject = filterObject(ultrasound.toJSON(), objectPropExclude) // filterObject returns an object with the given array of propertiesd excluded

      return res.status(200).json({
        status: 'success',
        data: revisedObject
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
 
  updateUltrasound: async (req, res) => {
    try {
      const patientId = req.params.patientId
      const payload = req.body
      const ultrasound = await UltrasoundModel.updateUltrasound(payload, {
        patientId
      })
      
      if (ultrasound[0] === 0){
        return res.status(400).json({
          status: false,
          data: `invalid request`
        }
      )}
      return res.status(200).json({
        status: true,
        data: `patient ${patientId} ultrasound has been updated successfully`
      })
      
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  deleteUltrasound: (req, res) => {
    try {
      const patientId = req.params.patientId
      const ultrasound = UltrasoundModel.deleteUltrasound({ patientId })
      return res.status(200).json({
        status: true,
        data: `patient ${patientId} has been deleted successfully`
      })
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err
      })
    }
  }
}
