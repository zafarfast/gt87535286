const express = require('express'); //Adding Express module
const path = require('path'); // Adding path module
const PORT = process.env.port || 3001; //Defining applicatio port number
const fs = require('fs') // Adding File system Module

const app = express(); //Initializing Express app

app.use(express.json()); //Using express.json() middleware
app.use(express.static('public')); //Making public folder publically accessible

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for Notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for /api/notes
app.get('/api/notes', (req, res) =>

  //Reading databse file and sending it to client
  fs.readFile('./db/db.json', "utf8", (err, data) => {
    res.json(JSON.parse(data))
  }
    )
);

// POST Route for /api/notes

app.post('/api/notes', (req, res) => {

  //Reading database file, converting it to JSON array
  //and then adding the JSON  object received in POST request to that
  //array, then converting it back to String and storing it to database
  //file.

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    k = data;
    k = JSON.parse(k)
    k.push(req.body)
    fs.writeFile("./db/db.json", "" + JSON.stringify(k), (err) => { })
    res.send("Note added to database")
  })
}
);

// DELETE Route for /api/notes

app.delete('/api/notes/:id', (req, res) => {

  //Reading database file, converting it to JSON array
  //and then finding JSON  object that contains the 'ID'
  //received in the request and deleting it then storing 
  // the resulting JSON array back to the database file

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let temp;
    temp = JSON.parse(data)
    const nodeID = req.params.id;
    let indexToBeDeleted;
    let newArray = temp.filter((item, index) => {
      if (item.id != nodeID) {
        return true
      }
      else { return false }
    })
    fs.writeFile("./db/db.json", JSON.stringify(newArray), (err) => { })

    res.send("Note deleted from database")
  })
}
);

// Listens to requests on 'PORT'
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
}
);
