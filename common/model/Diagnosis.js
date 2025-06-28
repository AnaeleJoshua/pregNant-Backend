// const { query } = require('express')
const { DataTypes } = require('sequelize')

const Diagnosis = {

  diagnosisId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  menstrual: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // breast: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false
  // },
  breastEnlargement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  morningSickness: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  enlargedBladder: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tiredness: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  areola: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  moodSwing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  hCG: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cyst: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  bodyOut: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ultrasound: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  labResult: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  // patientId: {
  //   type: DataTypes.INTEGER,
  // }

}

module.exports = {
  initialize: (sequelize) => {
    // this.model = sequelize.define('Diagnosis', Diagnosis)
    return this.model = sequelize.define('Diagnosis', Diagnosis)
  },
  //   belongsTo:(object) => {
  //     return this.model.belongsTo(object)
  //   },
  createDiagnosis: (diagnosis) => {
    return this.model.create(diagnosis)
  },
  findDiagnosis: (query,attribute=null) => {
   if (attribute == null){
    return this.model.findOne({
      where: query
    })
   }
   return this.model.findOne({
    where:query
   ,attribute:attribute})
  },
  findAllDiagnosis: (query) => {
    return this.model.findAll(query)
  },
  updateDiagnosis: ( updatedValue,query) => {
    return this.model.update(updatedValue, {
      where: query
    })
  },
  deleteDiagnosis: (query) => {
    return this.model.destroy({
      where: query
    })
  }
}
