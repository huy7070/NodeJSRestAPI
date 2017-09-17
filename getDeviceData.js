module.exports = function (app) {
var moment = require('moment');
app.get('/getDeviceData', function (req, res) {
var finalArray = [];

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.search({
    index: 'hvac',
    type: 'sensor-1234-abcd',
    size: 1000,
    body: {
      query: {
        match_all: {}
      },
      sort: [
        {'timestamp':{order: 'asc'}}
      ]
    }
 
  }).then(function (resp) {
    var temperatureArray = [];
    var humidityArray = [];
    for(var i = 0; i < resp.hits.hits.length; i++) {
      var time = resp.hits.hits[i]._source.timestamp;
      var timeInUnix = moment(time).unix() * 1000;
      var temperature = resp.hits.hits[i]._source.temperature;
      var humidity = resp.hits.hits[i]._source.humidity;

      temperatureArray.push([timeInUnix, temperature])
      humidityArray.push([timeInUnix, humidity])
    }

    finalArray.push({"temp":temperatureArray, "humidity":humidityArray});
    res.send(finalArray);

  }, function (err) {
      console.trace(err.message);
  });
});

};