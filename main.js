var request = require('request');
var Twit = require('twit');
var secrets = require('./secrets');

var url = 'http://dev.markitondemand.com/Api/v2/Quote/json';
var qs = {
    symbol: 'TSLA'
};

var T = new Twit(secrets);

request({
    url: url,
    qs: qs

}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        console.log(result);
        console.log('$' + result['LastPrice']);
        console.log(result['MarketCap']);

        var billion = 1000000000;
        var marketCap = parseInt(result['MarketCap']) / billion;
        marketCap = Math.floor(marketCap * 100) / 100;

        var status = "TSLA: $" + result['LastPrice'] + " - Market Cap: $" + marketCap + "B " + new Date().toLocaleString();
        console.log(status);

        T.post('statuses/update', { status: status }, function(err, data, response) {
          console.log(data);
        });
    }

});
