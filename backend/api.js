var Db = require('./dbquery')
const dbqueries = require('./dbquery')

//all required libraries for API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express() //express object
const router = express.Router(); //express router object
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)

//app.use(express.static(path.resolve(__dirname, '../steppingforward/build')));

//use this to test API is working on call
router.use((request, response, next) => {
    console.log("API is working properly")
    next();
})

//operations
router.route('/patients').get((request, response) => {
    dbqueries.getPatients().then(result => {
        response.json(result[0])
    })
})

router.route('/patientsresults/:data').get((request, response) => {
    console.log(JSON.parse(request.params.data))
    dbqueries.getPatientsResults(JSON.parse(request.params.data)).then(result => {
        response.json(result);
    })
})

router.route('/patients/:patientUID').get((request, response) => {
    dbqueries.getPatient(request.params.patientUID).then(result => {
        response.json(result)
    })
})

router.route('/patients/add').post((request, response) => {
    console.log("post is starting")
    let patient = request.body
    dbqueries.addPatient(patient).then(result => {
        response.status(201).json(result);
    })
})

router.route('/patients/addDetails').post((request, response) => {
    console.log("post is starting")
    let patientDetails = request.body
    dbqueries.addPatientDetails(patientDetails).then(result => {
        response.status(201).json(result);
    })
})

router.route('/patients/updateSteps').post((request, response) => {
    console.log("post is starting")
    let stepInfo = request.body
    dbqueries.updateSteps(stepInfo).then(result => {
        response.status(201).json(result);
    })
})

router.route('/patients/addSteps').post((request, response) => {
    console.log("post is starting")
    let stepInfo = request.body
    dbqueries.addSteps(stepInfo).then(result => {
        response.status(201).json(result);
    })
})

router.route('/patients/getSteps/:patientData').get((request, response) => {
    dbqueries.getSteps(JSON.parse(request.params.patientData)).then(result => {
        response.status(201).json(result);
    })
})

router.route('/patients/getAllSteps/:data').get((request, response) => {
    dbqueries.getAllSteps(JSON.parse(request.params.data)).then(result => {
        response.json(result)
    })
})

router.route('/patients/updateProfile').post((request, response) => {
    let patientInfo = request.body
    console.log(patientInfo)
    dbqueries.updatePatientProfile(patientInfo).then(result => {
        response.status(201).json(result);
    })
})
//Also think I have an issue with Disqualify not being called correctly
router.route('/patientsFuture').post((request, response) => {
    console.log("Post is starting.")
    let patientsFuture = request.body
    dbqueries.addFuturePatient(patientsFuture).then(result => {
        response.status(201).json(result);
    })
})

router.route('/allPatientsFuture').get((request, response) => {
    dbqueries.getFuturePatients().then(result => {
        response.json(result)
    })
})

var port = process.env.PORT || 1433
app.listen(port, () =>
    console.log('Capstone Project is running at ' + port)
)