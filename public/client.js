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
      text += record.name
    });
    
    $dataContainer.html(text);
  });
});