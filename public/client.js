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
    
    var text
    data.records.forEach(function(record) {
      
      var $galleryCard = $('<div class="location" />');
      if (record.picture[0]) {
        // Just show the first picture, if it has one.
        $('<img />').attr('src', record.picture[0].url).appendTo($galleryCard);
      }
      var $label = $('<strong />').text(record.get('Name'));
      $galleryCard.append($label);
      $dataContainer.append($galleryCard);
    });
  });
});