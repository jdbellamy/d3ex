d3ex
====

[ ![Codeship Status for jdbellamy/d3ex](https://codeship.com/projects/e20bcb50-70a2-0132-8828-465f6b223ee2/status?branch=master)](https://codeship.com/projects/54534)

[d3 dashboard example](https://d3ex.herokuapp.com)

Scraps
------

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
