var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require("http")
var httpHelpers = require("./http-helpers")

exports.downloadUrls = function(contentURL){
  // var archivePath = exports.paths['archivedSites']+'/';
  httpRequest.get ({
    url: "http://" + contentURL,
    progress: function(current, total) {
      console.log(current, total)
    }
  }, archivePath +'/'+contentURL, function(err, response){
    if(err) {
      console.log('getFilesErr', err);
      return;
    }
    console.log('finished downloading!')
  });
};
