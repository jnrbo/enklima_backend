const express = require('express'); // Biblioteca usada para fazer get/post

const ValidateAdmin = require('./auth/validate_admin');
const OccurrenceService = require('../service/occurrence_service');

const app = express.Router();


app.post('/register', (req, res) => {
    let occurrence = {
        officerName: req.body.officerName,
        type:        req.body.type,
        victims:     req.body.victims,
        local:       req.body.local,
        date:        req.body.date,
    };

    OccurrenceService.generate(occurrence, (err, occ) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, occurrence: occ })
    });
});

app.use('/remove', ValidateAdmin);
app.post('/remove/:id', (req, res) => {
    let occurrenceId = req.params.id;
    OccurrenceService.remove(occurrenceId, (err, occurrence) => {
        if (err) return res.json({success: false, error: err});

        res.json({success: true, occurrence: occurrence})
    });
});


app.use('/approve/:id', ValidateAdmin);
app.post('/approve/:id', (req, res) => {
    let occurrenceId = req.params.id;
    OccurrenceService.approve(occurrenceId, (err, occurrence) => {
        if (err) return res.json({success: false, error: err});

        res.json({success: true, occurrence: occurrence})
    });
});


app.get('/list-approveds', (req, res) => {
    OccurrenceService.list(true,(err, occurrences) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, occurrences: occurrences })
    });
});


app.use('/list-unapproveds', ValidateAdmin);
app.get('/list-unapproveds', (req, res) => {
    OccurrenceService.list(false,(err, occurrences) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, occurrences: occurrences })
    });
});


app.get('/show/:id', (req, res) => {
    OccurrenceService.show((err, occurrence) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, occurrence: occurrence })
    });
});


module.exports = app;
