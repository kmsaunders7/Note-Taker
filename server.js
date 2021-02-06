// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const express = require('express');
const fs = require('fs');
const data = require('./db/db.json')
const path = require('path')
// Tells node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


// The below code effectively "starts" our server

//routes created
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // If no matching route is found default to home
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


//GET request for already published notes, when the route is /api/notes...

app.get('/api/notes', function(req, res) {
    res.json(data)
    // fs.readFile('db/db.json', (err, data) => {
    //     if (err) throw err
    //     res.send(JSON.parse(data))
    // }) 
})

// POST request for new 

app.post('/api/notes/', (req, res) => {
    let note = req.body

    fs.readFile(('db/db.json'), 'utf8', (err, data) => {
        if (err) throw err
        data = JSON.parse(data)
        data.push(note)
       
        fs.writeFile(('db/db.json'), JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('Saved!');
            location.reload()
          });
    })   
    

})

//DELETE note request using params

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id)

    fs.readFile(path.join(_dirname + 'db/db.json'), 'utf8', (err, data) => {
        if (err) throw err
        data = JSON.parse(data)
        const result = data.filter(note => note.id != req.params.id);
       
        fs.writeFile(path.join(_dirname + 'db/db.json'), result, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    })

    

})

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
    