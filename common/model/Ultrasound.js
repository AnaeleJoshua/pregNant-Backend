const { DataTypes } = require('sequelize')

const ultrasound = {
  ultrasoundId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  headCircumference: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  femurLength: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  abdominalCircumference: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  biparietalDiameter: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dateOfUltrasound: {
    type: DataTypes.DATE,
    allowNull: false
  },
  foetal_weight:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  foetal_age:{
    type:DataTypes.FLOAT,
    allowNull:false
  }
}

module.exports = {
  initialize: (sequelize) => {
    return this.model = sequelize.define('ultrasound', ultrasound)
  },
  createUltrasound: (ultrasound) => {
    return this.model.create(ultrasound)
  },
  //when refactoring try !other instead of other==null
  findUltrasound:async (query,other) => {
    if (!other){
      const a = await this.model.findOne({
        where: query
      })
      console.log('a:',a)
      return a
    }
   const b = await this.model.findOne(
      {where:query,
      attributes:other})
      console.log('b:',b)
      return b
  },
  findAllUltrasound: (query) => {
    return this.model.findAll(query)
  },
  updateUltrasound: (updatedValue, query) => {
    return this.model.update(updatedValue, {
      where: query
    })
  },
  // findAllUltrasound: (query) => {
  //     return this.findAll({
  //       where: query
  //     })
  //   },
  deleteUltrasound: (query) => {
    return this.model.destroy({
      where: query
    })
  }

}
