// home.js

var inputs = 1;

$('#add').click(function(){
  inputs++;
  $('form').append("<br><input id='item" + inputs + "' autocomplete='off' /><input id='chance" + inputs + "' autocomplete='off' />");
});

$(function () {
    var socket = io();
    $('form').submit(function(e){
      var items = [];
      for ( var i = 0; i <= inputs; i++) {
        items.push($('#item'+i).val());
      };

      var chances = [];
      for ( var i = 0; i <= inputs; i++) {
        chances.push($('#chance'+i).val());
      };


      e.preventDefault(); // prevents page reloading

      socket.emit('chat message', {items: items, chances: chances, inputs: inputs})

      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });