var url = 'https://dash3d.herokuapp.com/javascripts/fixture_data.json';

d3.json(url, function(error, data) {

    console.log("data: " + JSON.stringify(data));

    var x = d3.scale.linear().domain([0,d3.max(data)]).range([0,1000]);

    var r = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([200,0]),
        g = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([0,0]),
        b = d3.scale.linear().domain([0,d3.max(data)]).rangeRound([100,0]);

    var c = function(x) { return d3.rgb(r(x),g(x),b(x)); }

    d3.select(".hbar")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", function(d) { return x(d) + "px"; })
      .style("background-color", function(d) { return c(d); })
      .style("text-align", "right")
      .text(function(d) { return d; });
});
