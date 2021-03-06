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

app.get("/data", function(_, response) {
  if (cachedResponse && new Date() - cachedResponseDate < cacheTimeoutMs) {
    response.send({ records: cachedResponse });
  } else {
    // cachedResponse = [];
    base(tableName)
      .select({
        maxRecords: 100,
        view: viewName
      })
      .eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          var thisRecord = {
            name: record.get("Name"),
            lat: record.get("Latitude"),
            lon: record.get("Longitude"),
            url: record.get("Website"),
            notes: record.get("Comments")
          };
          if (!thisRecord.name) return;
          cachedResponse.push(thisRecord);
        });
      });
    cachedResponseDate = new Date();
    response.send({ records: cachedResponse });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
