$(function() {
  var userLocation = [53.463059, -2.29134];
  var mymap = L.map("mapid").setView(userLocation, 14);
  
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'https://cdn.glitch.com/4c0f61c1-ab19-4504-a817-db81aa851c36%2Fmarker-icon.png?v=1603491669838',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -50],
    shadowUrl: 'https://cdn.glitch.com/4c0f61c1-ab19-4504-a817-db81aa851c36%2Fmarker-shadow.png?v=1603491093868',
    shadowSize: [41, 41],
    shadowAnchor: [10, 41]
})
  
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      userLocation = [position.coords.latitude, position.coords.longitude];
      mymap.panTo(userLocation);
      L.marker(userLocation)
        .addTo(mymap)
        .bindPopup("You are here");
    });
  }

  var getData = function() {
    $.getJSON("/data", function(data) {
      var $dataContainer = $("#data-container");

      if (data.error || !data.records) {
        $dataContainer.html("Error! " + data.error);
        setTimeout(getData, 500);
        return;
      }

      // Clear the loading message.
      $dataContainer.html("");

      var text = "";
      data.records.forEach(function(record) {
        var name = record.name;
        var lat = record.lat;
        var lon = record.lon;
        var url = record.url;
        var notes = record.notes;
        text += '<li><a href="' + url + '">' + name + "</a></li>";
        var marker = L.marker([lat, lon]).addTo(mymap);
        marker.bindPopup("<div class=\"popup\"><strong>" +
            name +
            "</strong><br>" +
            (notes || "") +
            '<br>🔗 <a href="' +
            url +
            '" target="_blank">' +
            name +
            "</a><br><a href=\"https://www.google.com/maps/dir/?api=1&destination="+lat+","+lon+"\" target=\"_blank\" class=\"nav-link\">📍 Directions</a></div>"
        );
      });

      $dataContainer.html("<ul>" + text + "</ul>");
    });
  };
  getData();
});
