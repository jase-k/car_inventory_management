
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

//Sample Car Objects
var chevyCar = {
  make: "Chevy",
  model: "Impala",
  year: 2008,
  price: "$7,500",
  color: "grey",
  description: "New Tires! Only 120,000 miles. Will do very well in the snow.",
  image: "chevy-imapala.jpg",
  specs: ["12.4L", "Gasoline", "Automatic", "28 city/ 42 hwy"],
  highlights: ["Bluetooth", "Sun Roof", "LightWeight"]
}
var fordCar = {
  id: 13,
  make: "Ford",
  model: "Fusion",
  year: 2014,
  price: "$10,500",
  color: "silver",
  description: 'New Battery! Only 70,000 miles. Lot of Life Left!',
  image: "ford-fusion.jpg",
  specs: ["1.4L", "Gasoline", "Automatic", "26 city/ 38 hwy"],
  highlights: ["Bluetooth", "Satellite Radio", "Keyless Entry", "Traction Control"]
}


//Creates the Tables Below in the Database. (Will Need to Delete to Store Data)
/*
db.serialize(()=>{
  db.run('DROP TABLE IF EXISTS Inventory');
  db.run('CREATE TABLE Inventory (id INTEGER PRIMARY KEY, make TEXT NOT NULL, model TEXT NOT NULL, year INTEGER NOT NULL, price TEXT NOT NULL, color TEXT, description TEXT, specs_id INTEGER, highlights_id INTEGER, image TEXT)');
  db.run('DROP TABLE IF EXISTS Specs')
  db.run('CREATE TABLE Specs (id INTEGER PRIMARY KEY, inventory_id INTEGER NOT NULL, specs1, specs2, specs3, specs4, specs5, specs6, specs7, specs8, specs9, specs10)')
  db.run('DROP TABLE IF EXISTS Highlights')
  db.run('CREATE TABLE Highlights (id INTEGER PRIMARY KEY, inventory_id INTEGER NOT NULL, highlights1, highlights2, highlights3, highlights4, highlights5, highlights6, highlights7, highlights8, highlights9, highlights10)')
})*/
//========================================
// Start of Functions Adding Cars to Database
//=========================================

//Gets Column String for Table (Specs and Higlights)
function getColumns(array, table){
  var columns = '';
  var table_lowercase = table.toLowerCase()

for(var i = 1; i <= array.length; i++){
  if(i !== array.length){
    columns += "'"+table_lowercase+i+"',"
  }else{ //String Can't end in a ','
    columns += "'"+table_lowercase+i+"'"
    return columns
    }
  }
};

//Gets Value for Sqlite Tables (Specs and Higlights)
function getValues(array){
  var values = '';
  for(var i = 0; i < array.length; i++){
  if(i !== array.length-1){
      values += "'"+array[i]+"',"
  }else{ //String Can't end in a ','
      values += "'"+array[i]+"'" }
    };
  return values
}

//Adds a Car to the Database (All Tables)
function addCar(object){
return new Promise ((resolve, reject) =>{
  db.run('INSERT INTO Inventory (make, model, year, price, color, description, image) VALUES ($make, $model, $year, $price, $color, $description, $image)',
      {
      $make: object.make,
      $model: object.model,
      $year: object.year,
      $price: object.price,
      $color: object.color,
      $description: object.description,
      $image: object.image
      },
     function(err){
      if(err){console.log(err)
      reject("Failed At: Inventory Table")     
             }
      console.log(this.lastID)
      var inventory_id = this.lastID //saves Row Id to use in the other tables

//Adds a Row into the Specs Table with the New Inventory Table Rows' Id
      db.run('INSERT INTO Specs (inventory_id,'+getColumns(object.specs, "Specs")+') VALUES('+inventory_id+','+getValues(object.specs)+')',
      function(err){
        if(err){
          console.log(err)
          reject("Failed At: Specs Table")}
        console.log("inventory_id", inventory_id)
        console.log("specs_id", this.lastID)

//Adds a Row into the Higlights Table with the New Inventory Table Rows' Id
      db.run('INSERT INTO Highlights (inventory_id,'+getColumns(object.highlights, "Highlights")+') VALUES('+inventory_id+','+getValues(object.highlights)+')',
      function(err){
        if(err){
          console.log(err);
          reject("Failed At: Highlights Table")
        }
        console.log("highlights_id:", this.lastID)
        resolve("Success")  
        })
      });
    });
  })
}

// addCar(chevyCar); 
// addCar(fordCar);
//========================================
// End of Functions Adding Cars to Database
//=========================================

//========================================
// Start of Functions Getting 1 Car from the Database
//=========================================  
function getCarInventory(id){
  var carObject = {};
return new Promise((resolve, reject) =>{
    db.get('SELECT * FROM Inventory WHERE id = $id', {$id: id},
        function(err, row){
          if(err){console.log(err)}
          if(row == undefined){reject("Couldn't Find Car by Id")}
            carObject = {
              id: row.id,
              make: row.make,
              model: row.model,
              year: row.year,
              price: row.price,
              color: row.color,
              description: row.description,
              image: row.image
              }
            resolve(carObject)
          })
    })
};
function getCarSpecs(carObject){
return new Promise((resolve, reject) => {
  var specsArray = [];
  db.get('SELECT * FROM Specs WHERE inventory_id = $id',{$id: carObject.id},
  (err, row) =>{
  if(err){console.log(err)}
  if(row == undefined){reject("Couldn't Find Specs Row")}

      for(var i = 1; i <= 10; i++){
        if(row["specs"+i]){
          specsArray.push(row["specs"+i])
        }
      }
      carObject.specs = specsArray
      resolve(carObject)
    })
 })
}
function getCarHighlights(carObject){
  var highlightsArray = [];
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Highlights WHERE inventory_id = $id',{$id: carObject.id},
    function(err, row){
    if(err){console.log(err);}
    if(row == undefined){reject("Couldn't Find Highlights Row")}
        for(var i = 1; i <= 10; i++){
          if(row['highlights'+i]){
            highlightsArray.push(row['highlights'+i])
          }
        }
    carObject.highlights = highlightsArray
        resolve(carObject)
      });
  })
}

/*
Wraps the Promise Functions Above to Retrieve
Car Data and Returns an Object.
*/
function getCarById(id){
return new Promise((resolve, reject) =>{
getCarInventory(id)
.then(data => getCarSpecs(data))
.then(data => getCarHighlights(data))
.then(data => resolve(data))
  });
}

getCarById(2).then(data => console.log(data))
//========================================
// End of Functions Getting 1 Car from the Database
//=========================================
//========================================
// Start of Functions Getting All Cars from the Database
//=========================================
function getAllCarInventory(){
  var carArray = [];
  var highlightsArray = [];
  var specsArray = [];
  var carObject = {};
return new Promise((resolve, reject) =>{
    db.each('SELECT * FROM Inventory',
        function(err, row){
          if(err){console.log(err)}
          if(row == undefined){reject("Couldn't Find Car by Id")}
            carObject = {
              id: row.id,
              make: row.make,
              model: row.model,
              year: row.year,
              price: row.price,
              color: row.color,
              description: row.description,
              image: row.image
              }     
  db.get('SELECT * FROM Specs WHERE inventory_id = $id',{$id: carObject.id},
  (err, row) =>{
  if(err){console.log(err)}
  if(row == undefined){reject("Couldn't Find Specs Row")}

      for(var i = 1; i <= 10; i++){
        if(row["specs"+i]){
          specsArray.push(row["specs"+i])
        }
      }
      carObject.specs = specsArray
      resolve(carObject)
       db.get('SELECT * FROM Highlights WHERE inventory_id = $id',{$id: carObject.id},
    function(err, row){
    if(err){console.log(err);}
    if(row == undefined){reject("Couldn't Find Highlights Row")}
        for(var i = 1; i <= 10; i++){
          if(row['highlights'+i]){
            highlightsArray.push(row['highlights'+i])
          }
        }
    carObject.highlights = highlightsArray
     carArray.push(carObject) 
       });  
  })
          },   
          function (err, AllRows){
        resolve(carArray)
            }
           )
    })
};


//========================================
// End of Functions Getting All Cars from the Database
//=========================================
 

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/addcar', function(request, response) {
  response.sendFile(__dirname + '/views/addcar.html');
});

function stringToArray(str){
return str.split(",")
}

app.post('/addnewcar', function(request, response){
  var carObject = request.query
 
  if(typeof carObject.specs === 'string'){
    console.log("Specs is String")
  carObject.specs = stringToArray(carObject.specs)
  }
if(typeof carObject.highlights === 'string'){
    console.log("Highlights is String")
  carObject.highlights = stringToArray(carObject.highlights)
  }
  
  addCar(carObject).then(results => response.send(results))
  
});

app.get('/allcars', function(request, response){
  
  getAllCarInventory().then(data => response.json(data))
  
});


//Uncomment Below to Print Tables in Console

db.all('SELECT * FROM Inventory', (err, row)=>{
    console.log("Inventory Table:", row)
  });
db.all('SELECT * FROM Specs', (err, row)=>{
      console.log("Specs Table:", row)
    });
db.all('SELECT * FROM Highlights', (err, row)=>{
        console.log("Higlights Table:", row)
      });

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
 