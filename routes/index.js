var express = require('express');
var router = express.Router();
var fixtureData = require('../public/javascripts/fixture_data.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Dashboard', fixtureData: fixtureData, testv: 'testing...' });
});


module.exports = router;
