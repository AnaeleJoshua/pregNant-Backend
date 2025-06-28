const UltrasoundModel = require('../../common/model/Ultrasound')
const {findDiagnosis} = require('../../common/model/Diagnosis')
const {isPregnant,calculateConceptionDate,calculateDeliveryDate,filterObject} = require('../../utility/utility')


module.exports = {
  getFoetalAge: async (req, res) => {
    const patientId = req.params.patientId
   
    try {
      const ultrasound = await UltrasoundModel.findUltrasound(
        { patientId: patientId })
      const foetals_age = filterObject(ultrasound.toJSON(),['ultrasoundId','patientId','createdAt','updatedAt'])
      return res.status(200).json({
        status: 'sucess',
        data: foetals_age
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  getFoetalWeight: async (req, res) => {
    const patientId = req.params.patientId
    console.log(patientId)
    try {
      const ultrasound = await UltrasoundModel.findUltrasound(
        { PatientId: patientId })
      
        const foetals_weight = filterObject(ultrasound.toJSON(),['ultrasoundId','patientId','createdAt','updatedAt','foetal_age'])

      return res.status(200).json({
        status: 'success',
        data: foetals_weight
      })
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err
      })
    }
  },

  getConceptionDate: async (req, res) => {
    try {
      const patientId = req.params.patientId
      const ultrasound = await UltrasoundModel.findUltrasound(
        { PatientId: patientId })
      
        const foetals_data = filterObject(ultrasound.toJSON(),['ultrasoundId','patientId','createdAt','updatedAt'])
        const {dateOfUltrasound,foetal_age} = foetals_data
        console.log(dateOfUltrasound)
        console.log(foetal_age)
        const conceptionDate = calculateConceptionDate(foetal_age,dateOfUltrasound)
        const datee = conceptionDate.toISOString().split('T')[0]
        const data = Object.assign(foetals_data,{conceptionDate:datee})
        return res.status(200).json({
          status: 'success',
          data: data
        })
      } catch (err) {
      console.log(err)
      res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  getEstimatedDeliveryDate: async (req, res) => {
    try {
      const patientId = req.params.patientId
      const payload = req.body
      const ultrasound = await UltrasoundModel.findUltrasound(
        { PatientId: patientId })
      
        const foetals_data = filterObject(ultrasound.toJSON(),['ultrasoundId','patientId','createdAt','updatedAt'])
        const {dateOfUltrasound,foetal_age} = foetals_data
        console.log(dateOfUltrasound)
        console.log(foetal_age)
        const deliveryDate = calculateDeliveryDate(foetal_age,dateOfUltrasound)
        const datee = deliveryDate.toISOString().split('T')[0]
        const data = Object.assign(foetals_data,{deliveryDate:datee})
        return res.status(200).json({
          status: 'success',
          data: data
        })
      } catch (err) {
      console.log(err)
      res.status(500).json({
        status: false,
        error: err
      })
    }
  },
  getPregnancyReport: async (req, res) => {
    const patientId = req.params.patientId
    console.log(patientId)
    try {
      const diagnosis = await findDiagnosis({patientId:patientId})
      // console.log(diagnosis.toJSON())
      // console.log(diagnosis)
      const objectPropExclude = ['createdAt', 'updatedAt','patientId','diagnosisId',] // array of properties to be excluded from response
      const revisedObject = filterObject(diagnosis.toJSON(), objectPropExclude) // filterObject returns an object with the given array of propertiesd excluded
      // const {menstrual,breastEnlargement,
      //   morningSickness,enlargedBladder,
      //   tiredness,areola,moodSwing,hcG,
      //   cyst,bodyOut,ultrasound,
      //   labResult} = diagnosis
        // console.log(menstrual)
      const pregStatus = isPregnant(revisedObject)
      console.log(pregStatus)
        return res.status(200).json({
          status:true,
          pregnancyStatusPercentage:pregStatus,
          pregnancyStatusMessage:`You are ${pregStatus}% likely pregnant, go for a lab test or ultrasound`
        })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status:false,
        data:err
    })
  }
}
}