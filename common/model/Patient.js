const { DataTypes } = require('sequelize')

const PatientModel = {

  patientId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'female'
  }

}

module.exports = {
  initialize: (sequelize) => {
    return this.model = sequelize.define('Patient', PatientModel)
  },
  //   hasOne:(object) => {
  //     return this.model.hasOne(object)
  //   },
  createPatient: (patient) => {
    return this.model.create(patient)
  },
  findPatient: (query) => {
    return this.model.findOne({
      where: query
    })
  },
  updatePatient: (updatedPatient, query) => {
    return this.model.update(updatedPatient, { where: query })
  },
  findAllPatients: (query) => {
    return this.model.findAll(query)
  },

  deletePatient: (query) => {
    return this.model.destroy({
      where: query
    })
  }
} 