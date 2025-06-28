const {findAllPatients} = require('../common/model/Patient')
const {findDiagnosis} = require('../common/model/Diagnosis')
const {findAllUltrasound, findUltrasound} = require('../common/model/Ultrasound')
const {filterObject} = require('../utility/utility')

async function getIds(model,query,attribute=null){
     if (attribute==null){
        const Ids = await model(query)
        return Ids
     }else{
        const Ids = await model(query,attribute)
        return Ids
     }
    // console.log(patientIds)
    
}



module.exports = {
    auth:async (req,res,next)=>{
        const patientId = req.params.patientId
        const getAll_ids = await getIds(findAllPatients,{attributes:[`patientId`],raw:true})
       try{
        if (getAll_ids.length == 0 || !([].concat(...getAll_ids.map(obj=> Object.values(obj)))).includes(Number(patientId))){
            return res.status(401).json({
                error: "unauthorized",
                message: "invalid patient id"
            }) 
        }
        next()
       }catch(err){
        console.error(err)
        return res.status(401).json({
            error: "unauthorized",
            message: "invalid patient id"
        })
       }
      
    },
    DiagnosisRouteAuth: async (req,res,next)=>{
        const patientId = req.params.patientId
        //get diagnosisId with the patientId: <patientId>
        const getAll_ids = await getIds(findDiagnosis,{patientId:patientId})
        
       console.log(getAll_ids)
        try{
        if (!getAll_ids){
            return res.status(401).json({
                error: "unauthorized",
                message: "invalid request, No diagnosis record"
            }) 
        }
        next()
       }catch(err){
        console.error(err)
        return res.status(401).json({
            error: "unauthorized",
            message: "invalid patient id"
        })
       }
      
    },
    ultrasoundRouteAuth: async (req,res,next)=>{
        const patientId = req.params.patientId
        const getAll_ids = await getIds(findUltrasound,{patientId:patientId})
       try{
        // if (getAll_ids.length == 0 || !([].concat(...getAll_ids.map(obj=> Object.values(obj)))).includes(Number(patientId))){
        //     return res.status(401).json({
        //         error: "unauthorized",
        //         message: "invalid patient id"
        //     }) 
        if (!getAll_ids){
            return res.status(401).json({
                        error: "unauthorized",
                        message: "invalid patient id"
        })
        }
        next()
       }catch(err){
        console.error(err)
        return res.status(401).json({
            error: "unauthorized",
            message: "invalid patient id"
        })
       }
      
    },

}
//  getIds()