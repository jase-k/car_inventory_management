
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(()=>{
  db.run('DROP TABLE IF EXISTS Inventory');
  db.run('CREATE TABLE Inventory (id INTEGER PRIMARY KEY, make TEXT NOT NULL, model TEXT NOT NULL, year INTEGER NOT NULL, price TEXT NOT NULL, color TEXT, description TEXT, specs_id INTEGER, highlights_id INTEGER, image TEXT)');
  db.run('DROP TABLE IF EXISTS Specs')
  db.run('CREATE TABLE Specs (id INTEGER PRIMARY KEY, inventory_id INTEGER NOT NULL, specs1, specs2, specs3, specs4, specs5, specs6, specs7, specs8, specs9, specs10)')
  db.run('DROP TABLE IF EXISTS Highlights')
  db.run('CREATE TABLE Highlights (id INTEGER PRIMARY KEY, inventory_id INTEGER NOT NULL, highlights1, highlights2, highlights3, highlights4, highlights5, highlights6, highlights7, highlights8, highlights9, highlights10)')

})

  
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
