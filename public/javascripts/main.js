

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  
  var url = 'http://dash3d.herokuapp.com/javascripts/fixture_data.json';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
makeCorsRequest();


/*
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
*/
