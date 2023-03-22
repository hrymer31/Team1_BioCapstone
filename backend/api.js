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

router.route('/patients/:patientID').get((request, response) => {

    dbqueries.getPatient(request.params.patientID).then(result => {
        response.json(result[0])
    })
})

router.route('/patients/add').post((request, response) => {
    console.log("post is working")

    let patient = request.body
    dbqueries.addPatient(patient).then(result => {
        response.status(201).json(result);
    })
})

var port = process.env.PORT || 1433
app.listen(port, () =>
    console.log('Chart of Account API is running at ' + port)
)