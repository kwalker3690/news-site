angular.module('app.services', [])

.factory('Wiki', function($http) {
	var nytMostPopular = function(entry) {
		var buzzword = entry + '+'
		return $http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ buzzword +'&api-key=3bfafd73084b3e3aa30ebc430ed58169:14:59352382')
		.then(function(resp) {
			console.log(resp)
			return resp
		})
	}

	// var nytMostPopular = function() {
	// 	return $http.get('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?offset=100&api-key=64a1f95786add4d3926830ee7ccae529:7:59352382')
	// 	.then(function(resp) {
	// 		return resp
	// 	})
	// }

	return {
		nytMostPopular: nytMostPopular
	}
})