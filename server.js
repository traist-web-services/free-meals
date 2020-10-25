var express = require("express");
var Sequelize = require("sequelize");
var app = express();
var Location;

var sequelize = new Sequelize(
  "database",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project on Glitch
    storage: ".data/database.sqlite"
  }
);

sequelize
  .authenticate()
  .then(function(err) {
    Location = sequelize.define("locations", {
      name: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.DECIMAL(10, 8)
      },
      lon: {
        type: Sequelize.DECIMAL(10, 8)
      },
      url: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      }
    });
  })
  .catch(function(err) {
    console.log("Unable to connect to the database: ", err);
  });

var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);
var tableName = "Locations";
var viewName = "Grid view";

var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

var cacheTimeoutMs = 30 * 1000; // Cache for 30 seconds.
var cachedResponse = [];
var cachedResponseDate = null;

app.get("/data", function(request, response) {
  if (cachedResponse && new Date() - cachedResponseDate < cacheTimeoutMs) {
    response.send({ records: cachedResponse });
  } else {
    Location.findAll().then(function(locationList) {
      cachedResponse = locationList;
      cachedResponseDate = new Date();
      response.send({ records: cachedResponse });
    });
  }
});

// Define a key in .env. It's not beautiful, and not secure, but probably enough for the moment.
app.get("/reset/:reset_key", function(request, response) {
  if (request.params.reset_key !== process.env.RESET_KEY) {
    response.send(403, 'Not authorised')
    return;
  }
  Location.sync({ force: true }).then(function() {
    base(tableName)
      .select({
        maxRecords: 10000,
        view: viewName
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            var thisRecord = {
              name: record.get("Name"),
              lat: record.get("Latitude"),
              lon: record.get("Longitude"),
              url: record.get("Website"),
              notes: record.get("Comments")
            };
            if (!thisRecord.name) return;
            Location.create(thisRecord);
            console.log("Added " + thisRecord.name);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          } else {
            response.send("done!");
          }
        }
      );
  });
});


/*
// creates a new entry in the users table with the submitted values
app.post("/users", function (request, response) {
  User.create({ firstName: request.query.fName, lastName: request.query.lName});
  response.sendStatus(200);
});
*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
