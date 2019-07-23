const fs = require('fs');
let path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 4200));

app.use('/', express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/sample_data.json', function(req, res) {
  fs.readFile('sample_data.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/sample_data.json', function(req, res) {
  fs.readFile('sample_data.json', function(err, data) {
    var sample_data = JSON.parse(data);
    sample_data.unshift(req.body);
    fs.writeFile('sample_data.json', JSON.stringify(sample_data, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(sample_data);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
