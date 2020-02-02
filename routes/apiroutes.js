var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();

const notes = [];
const note = {};

module.exports = function(app){

    app.get("/api/notes", function(req, res){
        return res.json(notes);
    });
    
    var id = 0;

    app.post("/api/notes", function(req, res){
        var note = req.body;
        note.id = id++;
        notes.push(note);
        fs.writeFile("../db/db.json", notes, function(err) {
            if(err) {return console.log(err);}
            console.log("The file was saved!");
        }); 
        res.json(note);
    });

    app.delete("/api/notes/:id" , function(req, res){
        var id = parseInt(req.params.id)
        console.log(req.params);
        console.log(req.params.id);

        console.log("current array: "+ JSON.stringify(notes));

        var removeIndex = notes.map(function(note) { return note.id; }).indexOf(id);

        // remove object
        notes.splice(removeIndex, 1);

        fs.writeFile("../db/db.json", notes, function(err) {
            if(err) {return console.log(err);}
            console.log("The file was saved!");
        }); 
        
        console.log("new notes array: " + JSON.stringify(notes))
        res.sendStatus(200).end();
    });

    app.delete("api/notes", function(req, res) {
        console.log(`Received a ${req.method} request from ${req.url}`)
    });
    
}