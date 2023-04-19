var config = require('./dbconfig')
const sql = require('mssql')

async function getPatients() {
    try {
        let pool = await sql.connect(config);
        let patients = await pool.request().query("SELECT * from patientInfo")
        return patients.recordsets;
    } catch (error) {
        console.log(error);
    }
}
async function getPatient(patientUID) {
    try {
        let pool = await sql.connect(config);
        let patient = await pool.request()
            .input('uid', sql.VarChar, patientUID)
            .query("SELECT * FROM patientDetails WHERE uid = @uid")
        return patient.recordsets[0];
    } catch (error) {
        console.log(error)
    }
}
async function addPatient(patientInfo) {
    try {
        let pool = await sql.connect(config);
        console.log('connecting...')
        let insertPatient = await pool.request()
            .input('uid', sql.VarChar, patientInfo.uid)
            .input('accessCode', sql.VarChar, patientInfo.accessCode)
            .input('name', sql.VarChar, patientInfo.name)
            .input('email', sql.VarChar, patientInfo.email)
            /* .input('patientID', sql.Int, patientInfo.patientID)
            .input('currentWeight', sql.Float, patientInfo.currentWeight)
            .input('targetWeight', sql.Float, patientInfo.targetWeight)
            .input('waistCircumference', sql.Float, patientInfo.waistCircumference)
            .input('neckCircumference', sql.Float, patientInfo.neckCircumference)
            .input('bodyMassIndex', sql.Float, patientInfo.bodyMassIndex)
            .input('age', sql.Int, patientInfo.age)
            .input('height', sql.Float, patientInfo.height)
            .input('sex', sql.NChar, patientInfo.sex)
            .input('race', sql.NVarChar, patientInfo.race)
            .input('username', sql.NVarChar, patientInfo.username)
            .input('password', sql.NVarChar, patientInfo.password) */
            .query("INSERT INTO patientDetails " +
               "(uid, name, email, accessCode)" + "VALUES(@uid, @name, @email, @accessCode)")
            /* 
                "(patientId, currentWeight, targetWeight, waistCircumference, neckCircumference, bodyMassIndex, age,sex,race,username,password) " +
                "VALUES (@patientId, @currentWeight, @targetWeight, @waistCircumference, @neckCircumference, @bodyMassIndex, @age,@sex,@race,@username,@password)") */
        return insertPatient.recordsets;
    } catch (error) {
        console.log(error)
    }
}

async function addPatientDetails(patientDetails) {
    try {
        let pool = await sql.connect(config);
        console.log('connecting...')
        let insertPatient = await pool.request()
            .input('uid', sql.VarChar, patientDetails.uid)
            .input('age', sql.Int, patientDetails.age)
            .input('sex', sql.VarChar, patientDetails.sex)
            .input('race', sql.VarChar, patientDetails.race)
            .input('neckCircumference', sql.Float, patientDetails.neckCircumference)
            .input('waistCircumference', sql.Float, patientDetails.waistCircumference)
            .input('height', sql.Int, patientDetails.height)
            .input('weightlb', sql.Int, patientDetails.weightlb)
            .input('bodyFatPerc', sql.Int, patientDetails.bodyFatPerc)
            .input('targetWeightLossPerc', sql.Float, patientDetails.targetWeightLossPerc)
            .input('weightkg', sql.Float, patientDetails.weightkg)
            .input('currentFatMass', sql.Float, patientDetails.currentFatMass)
            .input('currentFatFreeMass', sql.Float, patientDetails.currentFatFreeMass)
            .input('targetWeightLossKg', sql.Float, patientDetails.targetWeightLossKg)
            .input('targetBodyWeightKg', sql.Float, patientDetails.targetBodyWeightKg)
            .input('newFatMass', sql.Float, patientDetails.newFatMass)
            .input('targetBodyFatPerc', sql.Float, patientDetails.targetBodyFatPerc)
            .input('stepsPerDay', sql.Float, patientDetails.stepsPerDay)
            .input('totalStepTarget', sql.Float, patientDetails.totalStepTarget)
            .input('currentWeight', sql.Int, patientDetails.currentWeight)
            .query("UPDATE patientDetails " +
            "SET " + 
            "age=@age, sex=@sex, race=@race, neckCircumference=@neckCircumference, waistCircumference=@waistCircumference, height=@height, weightlb=@weightlb, bodyFatPerc=@bodyFatPerc, targetWeightLossPerc=@targetWeightLossPerc, weightkg=@weightkg, currentFatMass=@currentFatMass, targetWeightLossKg=@targetWeightLossKg, targetBodyWeightKg=@targetBodyWeightKg, newFatMass=@newFatMass, targetBodyFatPerc=@targetBodyFatPerc, stepsPerDay=@stepsPerDay, totalStepTarget=@totalStepTarget, currentWeight=@currentWeight " +
            "WHERE uid = @uid")
        return insertPatient.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function updateSteps(stepInfo){
    try {
        let pool = await sql.connect(config);
        let inputSteps = await pool.request()
            .input('uid', sql.VarChar, stepInfo.uid)
            .input('date', sql.Date, stepInfo.date)
            .input('stepCount', sql.Int, stepInfo.stepCount)
            .query("UPDATE patientSteps " 
            + "SET " + "stepCount=@stepCount " +
            "WHERE uid = @uid AND date = @date")
        return inputSteps.recordsets;
    } catch(error){
        console.log(error)
    }
}
async function addSteps(stepInfo) {
    try {
        let pool = await sql.connect(config);
        let inputSteps = await pool.request()
            .input('uid', sql.VarChar, stepInfo.uid)
            .input('date', sql.Date, stepInfo.date)
            .input('stepCount', sql.Int, stepInfo.stepCount)
            .query("INSERT INTO patientSteps " 
            + "(uid, date, stepCount) " + "VALUES(@uid, @date, @stepCount)")
        return inputSteps.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function getSteps(patientData){
    //console.log(patientData.uid)
    try {
        let pool = await sql.connect(config);
        let patient = await pool.request()
            .input('uid', sql.VarChar, patientData.uid)
            .input('date', sql.Date, patientData.date)
            .query("SELECT * FROM patientSteps WHERE uid=@uid AND date=@date")
        //console.log(patient)
        return patient.recordsets[0];
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPatients: getPatients,
    getPatient: getPatient,
    addPatient: addPatient,
    addPatientDetails: addPatientDetails,
    getSteps: getSteps,
    addSteps: addSteps,
    updateSteps: updateSteps
}