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
async function getPatient(patientID) {
    try {
        let pool = await sql.connect(config);
        let patient = await pool.request()
            .input('input_parameter', sql.Int, patientID)
            .query("SELECT * from patientInfo WHERE patientID = @input_parameter")
        return patient.recordsets;
    } catch (error) {
        console.log(error)
    }
}
async function addPatient(patientInfo) {
    console.log('connecting...')
    try {
        let pool = await sql.connect(config);
        console.log('connecting...')
        let insertPatient = await pool.request()
            .input('patientID', sql.Int, patientInfo.patientID)
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
            .input('password', sql.NVarChar, patientInfo.password)
            .query("INSERT INTO patientInfo " +
                "(patientId, currentWeight, targetWeight, waistCircumference, neckCircumference, bodyMassIndex, age,sex,race,username,password) " +
                "VALUES (@patientId, @currentWeight, @targetWeight, @waistCircumference, @neckCircumference, @bodyMassIndex, @age,@sex,@race,@username,@password)")
        return insertPatient.recordsets;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPatients: getPatients,
    getPatient: getPatient,
    addPatient: addPatient
}