const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;
const db = require('./db/db.json')
const fs = require('fs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for /api/notes
app.get('/api/notes', (req, res) =>
  res.json(db)
);

// POST Route for /api/notes

app.post('/api/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    k = data;
    k = JSON.parse(k)
    k.push(req.body)
    fs.writeFile("./db/db.json", "" + JSON.stringify(k), (err) => { })
    res.send("Body added to the file")
  })
}
);

// DELETE Route for /api/notes

app.delete('/api/notes/:id', (req, res) => {

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    let k;
    k = JSON.parse(data)
    const nodeID = req.params.id;
    let indexToBeDeleted;
    let newArray = k.filter((item, index) => {
      if (item.id != nodeID) {
        return true
      }
      else { return false }
    })
    console.log(newArray)
    fs.writeFile("./db/db.json", JSON.stringify(newArray), (err) => { })

    res.send("deleted from to the file")
  })
}
);

// Listens to requests on 'PORT'
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
}
);
