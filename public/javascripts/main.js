//d3.json('http://d3ex.herokuapp.com/javascripts/fixture_data.json', function(error, data) {
//d3.json('http://localhost:8089/api/states', function(error, data) {
d3.json('http://d3exsvc-41577.onmodulus.net/api/states', function(error, data) {

  var dashboard = function(id, fData) {

    var barColor = 'steelblue';

    function segColor(c) {
      return {
        low:"#807dba",
        mid:"#e08214",
        high:"#41ab5d"
      }[c];
    }

    fData.forEach(function(d) {
      d.total=d.freq.low+d.freq.mid+d.freq.high;
    });

    function histoGram(fD) {

      var hG = {},
      hGDim = { t:60, r:0, b:30, l:0 };
      hGDim.w = 500 - hGDim.l - hGDim.r,
      hGDim.h = 300 - hGDim.t - hGDim.b;

      var hGsvg = d3.select(id).append("svg")
        .attr("width", hGDim.w + hGDim.l + hGDim.r)
        .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
        .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

      var x = d3
        .scale.ordinal()
        .rangeRoundBands([0, hGDim.w], 0.1)
        .domain(fD.map(function(d) { return d[0]; }));

      hGsvg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + hGDim.h + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));

      var y = d3
        .scale.linear()
        .range([hGDim.h, 0])
        .domain([0, d3.max(fD, function(d) { return d[1]; })]);

      var bars = hGsvg
        .selectAll(".bar")
        .data(fD).enter().append("g")
        .attr("class", "bar");

      bars.append("rect")
        .attr("x", function(d) { return x(d[0]); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return hGDim.h - y(d[1]); })
        .attr('fill',barColor)
        .on("mouseover",mouseover)
        .on("mouseout",mouseout);

      bars.append("text").text(function(d){ return d3.format(",")(d[1])})
        .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
        .attr("y", function(d) { return y(d[1])-5; })
        .attr("text-anchor", "middle");

      function mouseover(d) {
        var st = fData.filter(function(s) { return s.state == d[0];})[0],
        nD = d3.keys(st.freq).map(function(s) { return {type:s, freq:st.freq[s]};});
        pC.update(nD);
      }

      function mouseout(d) {
        pC.update(tF);
      }

      hG.update = function(nD, color) {
        y.domain([0, d3.max(nD, function(d) { return d[1]; })]);
        var bars = hGsvg.selectAll(".bar").data(nD);
        bars.select("rect").transition().duration(500)
          .attr("y", function(d) {return y(d[1]); })
          .attr("height", function(d) { return hGDim.h - y(d[1]); })
          .attr("fill", color);
        bars.select("text").transition().duration(500)
          .text(function(d){ return d3.format(",")(d[1])})
          .attr("y", function(d) {return y(d[1])-5; });
      };

      return hG;
    }

    function pieChart(pD) {

      var pC = {}, pieDim = { w:250, h:250 };
      pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

      var piesvg = d3.select(id).append("svg")
      .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
      .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

      var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

      var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });
      piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
      .each(function(d) { this._current = d; })
      .style("fill", function(d) { return segColor(d.data.type); })
      .on("mouseover",mouseover).on("mouseout",mouseout);

      pC.update = function(nD) {
        piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
        .attrTween("d", arcTween);
      };

      function mouseover(d) {
        hG.update(fData.map(function(v) {
          return [v.state,v.freq[d.data.type]];
        }),segColor(d.data.type));
      }

      function mouseout(d) {
        hG.update(fData.map(function(v) { return [v.state,v.total]; }), barColor);
      }

      function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) { return arc(i(t));    };
      }

      return pC;
    }

    var tF = ['low','mid','high'].map(function(d) {
      return { type:d, freq:d3.sum(fData.map(function(t) { return t.freq[d]; })) };
    });

    var sF = fData.map(function(d){return [d.state,d.total];});
    var hG = histoGram(sF),
        pC = pieChart(tF);
  };

  dashboard('#dashboard',data);
});
