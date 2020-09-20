var stompClient = null;

function setConnected(connected) {
  $('#connect').prop('disabled', connected);
  $('#disconnect').prop('disabled', !connected);
  if (connected) {
    $('#conversation').show();
  } else {
    $('#conversation').hide();
  }
  $('#greetings').html('');
}

function connect() {
  var socket = new WebSocket('ws://localhost:8080/orderStatus');
  stompClient = Stomp.over(socket);
  var custName = $('#custId').val();
  stompClient.connect({}, function (frame) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/customer/' + custName, function (greeting) {
      showGreeting(greeting.body);
    });
    $('#connString').html(
      '<h2>Subcribed for the userId = ' + custName + ' </h2>'
    );
    $('#custId').val('');
  });
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  setConnected(false);
  $('#connString').html('<h2>You have not subscribed yet !</h2>');
  console.log('Disconnected');
}

function sendName() {
  stompClient.send(
    '/app/hello',
    {},
    JSON.stringify({ name: $('#name').val() })
  );
}

function showGreeting(message) {
  $('#greetings').append('<tr><td>' + message + '</td></tr>');
}

$(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
  });
  $('#connect').click(function () {
    connect();
  });
  $('#disconnect').click(function () {
    disconnect();
  });
  $('#send').click(function () {
    sendName();
  });
});
