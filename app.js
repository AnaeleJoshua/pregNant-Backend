const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const os = require('os')
const dotenv = require('dotenv')
const PatientRoutes = require('./Patient/routes')
const DiagnosisRoutes = require('./Diagnosis/routes')
const UltrasoundRoutes = require('./Ultrasound/routes')
const ReportRoutes = require('./Report/routes')
// const cors = require('cors');
// const morgan = require("morgan");
dotenv.config()
const port = process.env.PORT || 3000

// Sequelize model imports
const PatientModel = require('./common/model/Patient')
const DiagnosisModel = require('./common/model/Diagnosis')
const UltrasoundModel = require('./common/model/Ultrasound')
const { Sequelize } = require('sequelize')

// platforms
// const isMac = process.platform === 'darwin';
// const isWindows = process.platform === 'win32';
// const isLinux = process.platform === 'linux';
// storage folder path
const homeDir = os.homedir()
const folderName = '.pregNANT'
const folderPath = path.join(homeDir, folderName)

const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    try {
      fs.mkdirSync(folderPath)
      console.log('storage created successfully')
    } catch (err) {
      console.err('Erro creating storage folder', err)
    }
  } else { console.log('folder already exist') }
  return folderPath
}

// middleware
// app.use(morgan("tiny"));
// app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(express.json())

const sequelize = new Sequelize({
  dialect: 'sqlite',
  // storage: `${createFolder(folderPath)}/db.sqlite`
  storage: './storage/db.sqlite' // path to db

})

// initializing the model on sequelize
const patient = PatientModel.initialize(sequelize)
const diagnosis = DiagnosisModel.initialize(sequelize)
const ultrasound = UltrasoundModel.initialize(sequelize)

// console.log('patient is', PatientModel, DiagnosisModel)
// Define relationship between models
patient.hasOne(diagnosis, { foreignKey: 'patientId', onDelete:'CASCADE' })
diagnosis.belongsTo(patient, { foreignKey: 'patientId' })
patient.hasOne(ultrasound, { foreignKey: 'patientId', onDelete:'CASCADE'})
ultrasound.belongsTo(patient, { foreignKey: 'patientId' })

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log('Sequelize Initialised!!')
    app.use('/api/v1/patient/diagnosis', DiagnosisRoutes)
    app.use('/api/v1/patient/ultrasound', UltrasoundRoutes)
    app.use('/api/v1/patient/report/estimate', ReportRoutes)
    // app.use('/api/v1/patient/report/result', ReportRoutes)
    app.use('/api/v1/patient', PatientRoutes)

    app.listen(port, () => {
      console.log('Server Listening on PORT:', port)
    })
  }).catch((err) => {
    console.error('error ', err)
  })
