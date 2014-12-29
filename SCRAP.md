Scraps
======

d3 chart examples

horizontal bar chart
--------------------

```javascript
d3.json('/javascripts/fixture_data.json', function(error, data) {
  var x = d3.scale.linear().domain([0,d3.max(data)]).range([0,1000]);
  var r = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([200,0])
  , g = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([0,100])
  , b = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([100,0]);
  var c = function(x) {return d3.rgb( r(x),g(x),b(x) );}
  d3.select(".hbar").selectAll("div")
  .data(data).enter().append("div")
  .style("width", function(d) { return x(d) + "px"; })
  .style("background-color", function(d) { return c(d); })
  .text(function(d) { return d; });
});
```

```javascript
d3.json('/javascripts/fixture_data.json', function(error, data) {

  var x = d3.scale.linear().domain([0,d3.max(data)]).range([0,1000]);

  var r = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([100,155]),
  g = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([100,255]),
  b = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([255,0]);

  var c = function(x) { return d3.rgb(r(x),g(x),b(x)); }

  d3.select(".hbar2")
  .selectAll("div")
  .data(data)
  .enter().append("div")
  .style("width", function(d) { return x(d) + "px"; })
  .style("background-color", function(d) { return c(d); })
  .text(function(d) { return d; });
});
```

```html
<!doctype html>
<html>
<head>
<title>D3ex: dashboard examples</title>
<link rel="stylesheet" href="http://codemirror.net/lib/codemirror.css">
<script src="http://codemirror.net/lib/codemirror.js"></script>
<script src="http://codemirror.net/mode/xml/xml.js"></script>
<style>.CodeMirror {background: #eee;}</style>
</head>
<body>
<h1>examples</h1>
<h4>Service-wired histogram and piechart <a href="https://d3ex.herokuapp.com">here</a>.<h4>
<h4>REST API for d3ex<h4>
<script>var editor = CodeMirror.fromTextArea(document.getElementById("code"), {});</script>
<form>
<textarea id="code" name="code">
{
  "@context": {
    "name": "http://schema.org/name",
    "description": "http://schema.org/description",
    "image": {
      "@id": "http://schema.org/image",
      "@type": "@id"
    },
    "geo": "http://schema.org/geo",
    "latitude": {
      "@id": "http://schema.org/latitude",
      "@type": "xsd:float"
    },
    "longitude": {
      "@id": "http://schema.org/longitude",
      "@type": "xsd:float"
    },
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "name": "The Empire State Building",
  "description": "The Empire State Building is a 102-story landmark in New York City.",
  "image": "http://www.civil.usherbrooke.ca/cours/gci215a/empire-state-building.jpg",
  "geo": {
    "latitude": "40.75",
    "longitude": "73.98"
  }
}


[{"state":"AL","freq":{"low":4786,"mid":1319,"high":249 }},
{"state":"AZ","freq":{"low":1101,"mid":412 ,"high":674 }},
{"state":"CT","freq":{"low":932 ,"mid":2149,"high":418 }},
{"state":"DE","freq":{"low":832 ,"mid":1152,"high":1862}},
{"state":"FL","freq":{"low":4481,"mid":3304,"high":948 }},
{"state":"GA","freq":{"low":1619,"mid":167 ,"high":1063}},
{"state":"IA","freq":{"low":1819,"mid":247 ,"high":1203}},
{"state":"IL","freq":{"low":4498,"mid":3852,"high":942 }},
{"state":"IN","freq":{"low":797 ,"mid":1849,"high":1534}},
{"state":"KS","freq":{"low":162 ,"mid":379 ,"high":471 }}]

## GET api status page
curl -X GET http://d3ex.mod.bz/api

## GET states
curl -X GET http://d3ex.mod.bz/api/states

## DELETE state ${oid}
curl -X DELETE http://d3ex.mod.bz/api/states/${oid}

## INSERT state ${json}
curl -X POST -H "Content-Type: application/json" -d '{
  "state": "WA",
  "freq": { "low": 4786, "mid": 5319, "high": 2249 }
}' http://d3ex.mod.bz/api/states

</textarea>
</form>
</body>
</html>
```
