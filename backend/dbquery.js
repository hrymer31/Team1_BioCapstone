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

async function getPatientsResults(data){
    try {
        let pool = await sql.connect(config);
        let patients = await pool.request()
            .input('sDate', sql.Date, data.dateS)
            .input('eDate', sql.Date, data.dateE)
            .query("SELECT accessCode,age,sex,race,stepsPerDay,totalStepTarget,currentWeight,date FROM patientDetails WHERE date BETWEEN @sDate AND @eDate")  
        console.log(patients.recordsets[0])     
        return patients.recordsets[0]; 
    } catch (error) {
        console.log(error);
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
            .input('date', sql.Date, patientInfo.date)
            .query("INSERT INTO patientDetails " +
               "(uid, name, email, accessCode, date)" + "VALUES(@uid, @name, @email, @accessCode, @date)")
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
            .input('accessCode', sql.VarChar, stepInfo.accessCode)
            .input('date', sql.Date, stepInfo.date)
            .input('stepCount', sql.Int, stepInfo.stepCount)
            .query("INSERT INTO patientSteps " 
            + "(uid, date, stepCount, accessCode) " + "VALUES(@uid, @date, @stepCount, @accessCode)")
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
        return patient.recordsets[0];
    } catch (error) {
        console.log(error)
    }
}
async function getAllSteps(data) {
    try {
        let pool = await sql.connect(config);
        let patient = await pool.request()
            .input('sDate', sql.Date, data.dateS)
            .input('eDate', sql.Date, data.dateE)
            .query("SELECT accessCode, stepCount, date FROM patientSteps WHERE date BETWEEN @sDate AND @eDate")
        return patient.recordsets[0];
    } catch (error) {
        console.log(error)
    }
}

async function updatePatientProfile(patientDetails){
    try{
        let pool = await sql.connect(config);
        let patient = await pool.request()
            .input('email', sql.VarChar, patientDetails.newEmail)
            .input('name', sql.VarChar, patientDetails.newName)
            .input('uid', sql.VarChar, patientDetails.uid)
            .query("UPDATE patientDetails SET name=@name, email=@email WHERE uid=@uid")
    }catch (error){
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
    updateSteps: updateSteps,
    getPatientsResults: getPatientsResults,
    updatePatientProfile: updatePatientProfile,
    getAllSteps: getAllSteps
}