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
