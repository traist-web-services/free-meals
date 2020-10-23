// client-side js
// run by the browser each time your view template is loaded

$(function() {
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);
   L.tileLayer('https://.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
     attribution:
         '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
     maxZoom: 18
 }).addTo(mymap);
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
      marker.bindPopup("<strong>"+name+"</strong><br>I am a popup.").openPopup();
    });
    
    $dataContainer.html("<ul>" + text + "</ul>");
  });
});