var path = require('path');
var archive = require('./archive-helpers');
var httpHelpers = require('./http-helpers.js')
var fs = require('fs');
var http = require("http");
var async = require("async")
var express = require('express');
// require more modules/folders here!

var getAll = function (req, res) {
  console.log('getAll');
  console.log('req.url', req.url, 'req.method', req.method)
  if(req.url === '/'){
    httpHelpers.serveAssets(res, 'index.html', function(error, content) {
      if(error){
        console.log(error);
      } else {
        httpHelpers.sendContentResponse(res, content);
      }
    })

  // TODO: regex style sheets
  }else if ( req.url === '/loading.html'){

    httpHelpers.serveAssets(res, req.url, function(error, content){
      if(error){
        console.log(error)
      }else {
       // headers["Content-type"] = "text/css";
        httpHelpers.sendContentResponse(res, content)
      }

    })

  }else if ( req.url === '/styles.css') {

    httpHelpers.serveAssets(res, req.url, function(error, content){
      if(error){
        console.log(error)
      }else {
       // headers["Content-type"] = "text/css";
        httpHelpers.sendContentResponse(res, content)
      }

    })
  }else {
      console.log('req.url',req.url)
      httpHelpers.serveAssets(res, req.url, function(error, content){
      if(error){
        console.log(error)
      }else {
       // headers["Content-type"] = "text/css";
        httpHelpers.sendContentResponse(res, content)
      }

    })

  }
}

var getPageViewJSON = function(req, res){
  console.log('postURl')

  var data = '';
  var url = 'http://stats.grok.se/json/en/latest90' + req.url;
  http.get(url, function(outerResponse) {
    console.log('Status: ' + outerResponse.statusCode);
    console.log('HEADERS: ' + JSON.stringify(outerResponse.headers));
    outerResponse.setEncoding('utf8');

    outerResponse.on('data', function (chunk) {
      data += chunk
    });
    outerResponse.on('end', function(){
      console.log('BODY: ' + data);
      res.end(data);
    })
  });
}

var actionMap = {
  'GET' : getAll,
  'POST' : getPageViewJSON
}


exports.handleRequest = function (req, res) {
  console.log('handleRequest')
  var action = actionMap[req.method];
  if(action) {
    action(req, res)
  } else {
    sendContentResponse(res, '404 error. whoops.')
  }
};
