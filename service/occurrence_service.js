const Occurrence = require('../model/occurrence');


class OccurrenceService {

    static generate(occurrence, callback) {
        new Occurrence({
            officerName: occurrence.officerName,
            type: occurrence.type,
            victims: occurrence.victims,
            local: occurrence.local,
            date: occurrence.date,
            approved: false,
        }).save(callback);
    }

    static approve(occurrenceId, callback) {
        OccurrenceService.show(occurrenceId, (err, occurrence) => {
            occurrence.approved = true;
            occurrence.save(callback);
        });
    }

    static unapprove(occurrenceId, callback) {
        OccurrenceService.show(occurrenceId, (err, occurrence) => {
            occurrence.approved = false;
            occurrence.save(callback);
        });
    }

    static remove(occurrenceId, callback) {
        Occurrence.deleteOne({ _id: occurrenceId }, callback);
    }

    static show(occurrenceId, callback) {
        Occurrence.findById(occurrenceId, callback);
    }

    static list(approved, callback) {
        Occurrence.find({ approved: approved }, callback);
    }
}


module.exports = OccurrenceService;
