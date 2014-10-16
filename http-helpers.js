var path = require('path');
var fs = require('fs');
var archive = require('./archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  console.log('serveAssets')
  console.log(__dirname);
  var filename = asset;
  if(asset === 'index.html') {
    filename = __dirname +'/public/' + filename;
  } else {
    filename = __dirname + filename;
  }
  console.log(filename);

  fs.readFile(filename, callback)
};

exports.urlRegexMatch = function(pattern, request) {
  var match = RegExp(pattern).exec(request.url);
  match = match ? match[0] : null;
  return match;
}

exports.redirect = function(res, url, statusCode) {
  exports.headers['Location'] = '/' + url;
  res.writeHead(statusCode, exports.headers);
  res.end()
}

exports.sendContentResponse = function(res, content) {
  console.log('sendResponse')
  // res.writeHead(200, exports.headers);
  res.end(content)
}
