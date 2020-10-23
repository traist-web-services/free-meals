// client-side js
// run by the browser each time your view template is loaded

$(function() {
  var userLocation = null;
  if(!navigator.geolocation) {
    userLocation = [53.463059, -2.291340];
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      userLocation = [position.coords.latitude, position.coords.longitude];
      console.log(userLocation);
    });
  }
  var mymap = L.map('mapid').setView(userLocation, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution:
         '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
     maxZoom: 18
  }).addTo(mymap);
  
  /*
  $.getJSON('/data', function(data) {
    var $dataContainer = $('#data-container');
      
    if (data.error) {
      $dataContainer.html('Error! ' + data.error);
      return;
    }
      
    // Clear the loading message.
    $dataContainer.html('');
    
    var text = ""
    data.records.forEach(function(record) {
      var name = record.name;
      var lat = record.lat;
      var lon = record.lon;
      var url = record.url;
      var notes = record.notes;
      text += "<li><a href=\""+url+"\">"+name+"</a></li>";
      var marker = L.marker([lat, lon]).addTo(mymap);
      marker.bindPopup("<strong>"+name+"</strong><br>I am a popup.");
    });
    
    $dataContainer.html("<ul>" + text + "</ul>");
  });
  */
});