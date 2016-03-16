var UI = require('ui');
var ajax = require('ajax');
var particleDeviceId = '33002b000947343432313031';
var particleAccessToken = 'c6d6bcd8a41dae9ca9af6b777468d669fe5d769e';
var urlPrefix = 'https://api.spark.io/v1/devices/'+particleDeviceId+'/';

var main = new UI.Card({
  title: 'Photon App',
  icon: 'images/menu_icon.png',
  subtitle: 'Acciones',
  body: 'Click Up, Down, or Select. Long-click Select or Down.'
});

var particleCall = function(method, param) {
  var URL = urlPrefix + method;
  var data = {access_token: particleAccessToken};
  if (param) {
    data.params = param;
  }
  ajax({
      //type: 'json',
      url: URL,
      method: 'post',
      data: data
    },
       
    function(json) {
      console.log("Success");
    },
       
    function(error) {
      console.log("Error");
    }
  );
};

var lookCenter = function() {
  particleCall('estado', 'all');
};

var lookLeft = function() {
  particleCall('estado', 'off');
};

var lookRight = function() {
  particleCall('estado', 'on');
};

var downall = function() {
  particleCall('estado', 'downall');
};

var toggleRandom = function() {
  particleCall('ramdon');
};



main.show();

main.on('click', 'up', function(e) {
  lookLeft();
});

main.on('click', 'select', function(e) {
  lookCenter();
});

main.on('longClick', 'select', function(e) {
  toggleRandom();
});

main.on('click', 'down', function(e) {
  lookRight();
});

main.on('longClick', 'down', function(e) {
  downall();
});