const express = require('express');
const path = require('path');
const app = express();
// const PORT = 3000;
// const PORT = process.env.PORT || 3000;
var PORT = process.env.PORT || 3000;
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');



app.use(express.static('Develop/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
//GET ======================================>
// app.get("/", (req, res) => {
//    res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));

// });
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
   });

// app.get("/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, 'Develop', 'public', 'notes.html'));
 
//  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
   });

// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`);
    
// });
// template literl doesnt need back ticks
app.listen(port, () => {
    console.log(App listening on port ${port});
 });



app.get( `/api/notes`, (req, res) => {
    fs.readFile('develop/db/db.json','utf8',(err,data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    })
})

// POST================================>
app.post(`/api/notes`, (req, res)=> {
    const newNote = req.body;
    fs.readFile('develop/db/db.json','utf8',(err,data) => {
        const notes = JSON.parse(data);
        newNote.id = uuidv4();
        notes.push(newNote);
        fs.writeFile('develop/db/db.json', JSON.stringify(notes),(err) => {
           if(err){
               console.log(err)
           }
           res.json(newNote);
        })
    })
}) 


// DELETE =============================>
app.delete(`/api/notes/:id`, (req, res) => {
    const id = req.params.id;
    fs.readFile('develop/db/db.json', 'utf8', (err, data) => {
        let notes = JSON.parse(data);
        notes =  notes.filter(note => note.id !== id);
        fs.writeFile('develop/db/db.json', JSON.stringify(notes),(err) =>{
        if(err){
            console.log(err);
        };

        res.json(notes);
        })
    })
} )


