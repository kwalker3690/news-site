angular.module('app', [
	'app.services',
	'ngFx'
])

.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    // $httpProvider.interceptors.push('httpThrottler');
})

.controller('WikiController', function($scope, Wiki) {
	$scope.data = {}
	$scope.data.search = 'Obama';

	$scope.getMostPopular = function() {
		Wiki.nytMostPopular($scope.data.search)
			.then(function(data){
				// interestScore = interestScore + data;
				console.log(data)
				$scope.data = data.data.response
				$scope.data.formatted = []
				for(var i = 0 ; i < data.data.response.docs.length; i++) {
					var entry = data.data.response.docs[i];

					console.log(typeof entry.pub_date)
					var year = entry.pub_date.slice(0,4)
					var month = entry.pub_date.slice(5,7)
					var day = entry.pub_date.slice(8,10)
					var date = new Date(year, month, day)
					date = date.toLocaleString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
					console.log(date)
					var indivEntry = {
						headline: entry.headline.main,
						leadparagraph: entry.lead_paragraph,
						pubdate: date,
						photoUrl: {},
						category: entry.subsection_name,
						url: entry.web_url
					}
					for(var j = 0; j < entry.multimedia.length; j++) {
						if(entry.multimedia[j].subtype === 'xlarge'){
							indivEntry.photoUrl = entry.multimedia[j];
						}
					}

					if(indivEntry.photoUrl.url === undefined) {
						indivEntry.photoUrl.url = 'http://idsgn.org/images/know-your-type-cheltenham/nytimes-2008.jpg'
					} else {
						indivEntry.photoUrl.url = 'http://static01.nyt.com/' + indivEntry.photoUrl.url
					}
					$scope.data.formatted.push(indivEntry)

				}
			})
			.catch(function(error){
      	console.error(error);
    	});
	}

	$scope.getMostPopular()

})
