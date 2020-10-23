// client-side js
// run by the browser each time your view template is loaded

$(function() {
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
      text += "<a href=\""+url+"\">"+name+"</a>";
    });
    
    $dataContainer.html(text);
  });
});