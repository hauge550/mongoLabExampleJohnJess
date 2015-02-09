'use strict';

var mongoose = require('mongoose');


// Defining GPA Model
//=====================================================


var saveClass = mongoose.model('saveClass', {
    className: String,
    gradeEarned: String,
    numberOfCredits: Number
});

// Defining Routes
// =====================================================

exports.index = function(req, res) {
    saveClass.find(function (err, classes) {
        if (err) {
            console.log("Error getting data from database");
            res.send(err)
        } else {
            res.json(classes); // return results
        }
    });
};

exports.create = function(req, res) {
    saveClass.create(req.body, function (err, classes) {
        if (err) {
            res.send(err);
        } else {
            saveClass.find(function (err, classes) {
                if (err) {
                    res.send(err);
                }

                res.json(classes);
            });
        }
    });
};

exports.destroy = function(req, res) {
    saveClass.findById(req.params.classes_id, function(err, classes){
      if(err) { res.send(err); return "error: " + err; }
      if(!classes) { return res.sendStatus(404); }

      classes.remove(function(err){
         if(err) { return "error: " + err}
         return res.sendStatus(204);
      });
    });
};