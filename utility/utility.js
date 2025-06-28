
module.exports = {
     calculateFoetalAge : function(foetal_weight){
        /** 
         * calculates the foeatal age alias gestation age of the foetal. 
         * it is measured in weeks
         * @foetal_weight: is the weight of the foetal in grams
        /* 
        **/
       foetal_weight = Number(foetal_weight)
        const foetal_age_week =Math.floor(Math.sqrt(((Math.sqrt(foetal_weight + 2.730)) / 0.091)) - 10.523)
        console.log(foetal_age_week)
        return foetal_age_week
    },
     calculateFoetalWeight : function(biparietalDiameter,abdominalCircumference){
        /** 
         * calculates the foeatal weight of the foeatal in grams
         * @biparietalDiameter: is given in cm
        * @abdominalCircumference: given in cm
        * return: foetal_weight in cm
        **/
        const foetal_weight_grams = ((3200.40479 + 157.07186 
            * abdominalCircumference
             + 15.90391 * biparietalDiameter)/2).toFixed(2)
        return foetal_weight_grams
    },

     calculateConceptionDate : function(foetal_age,dm){
        /** 
         * calculates the date of conception of the foeatal
         * @foetal_age: alias Gestatation age is the age of the foetal in weeks
        /* @dm: date of measurement of gestation age
        return: conception date (cd)
        **/
        // @cd: conception_date in weeks
        
        const milliSecondsPerWeek = 7 * 24 * 60 * 60 * 1000
        const newDate = new Date(dm.getTime() - 6 * milliSecondsPerWeek) 
        console.log(newDate)
        return newDate

    },
     calculateDeliveryDate : function(foetal_age,dm){
        /** 
         * calculates the date of deliveryof conception of the foeatal
         * @foetal_age: alias Gestatation age is the age of the foetal in weeks
        /* @dm: date of measurement of gestation age
        **/
       //dd estimated date_of_delivery in weeks
       const milliSecondsPerWeek = 7 * 24 * 60 * 60 * 1000
       const newDate = new Date(dm.getTime() + 32 * milliSecondsPerWeek) 
       return newDate
    },
    filterObject: (object, properties)=>{
        /** 
         * filters out the given array of properties from a given object
         * @object: alias Gestatation age is the age of the foetal in weeks
        /* @properties: array of properties to be filtere out
        returns a new object excluding the array of properties
        **/
       let objs = {}
        for (const [key, value] of Object.entries(object)) {
            if (!properties.includes(key) ){
                objs[`${key}`] = value
            }
          }
          return objs
        
    },
    isPregnant:  (obj)=>{
       
        console.log(obj)
        const {labResult,ultrasound} = obj
        // console.log(labResult,ultrasound)
        if (labResult || ultrasound){
                return  '100'
            //pregncy object propeties values
      
    }else{
    const pregPropValue = Object.values(obj)
    const sumPregPropValue = pregPropValue.reduce((a,b)=>a+b)
    const percentageValue = Math.ceil((sumPregPropValue/pregPropValue.length) * 100)
    return percentageValue
    }
    
} 
}