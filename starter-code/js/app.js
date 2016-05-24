/* put js code here */

console.log('this file is running.');

var redApp = angular.module('redApp', []);

redApp.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
	//instantiate search term
	$scope.searchTerm = '';
	$scope.title = '';
	$scope.permalink = '';
	$scope.author = '';
	$scope.resultsTitles =[];
	$scope.resultspermas = [];
	$scope.resultsAuthors = [];
	// $scope.stats = {
	// 	name: '',
	// 	type: '',
	// 	height: 0,
	// 	weight: 0;
	// };

	//search function
	$scope.search = function() {
		var req = {
			url: "https://www.reddit.com/search.json?q=" + $scope.searchTerm,
			method: 'GET',
			
			//params only for when the url has a ? or a q before the query
			// params: {
			// 	q:$scope.searchTerm
			// }
		}

		$http(req).then(function success(res) {
			var redData = res.data.data.children;
			$scope.resultsTitles =[];
			$scope.resultspermas = [];
			$scope.resultsAuthors = [];
			for(var i=0; i<5; i++) {
			$scope.title = redData[i].data.title;
			$scope.author = redData[i].data.author;
			$scope.permalink = 'http://reddit.com' + redData[i].data.permalink;
			$scope.resultsTitles.push($scope.title);
			$scope.resultspermas.push($scope.permalink);
			$scope.resultsAuthors.push($scope.author);
		} 
		console.log($scope.resultsTitles);
		console.log($scope.resultspermas);
		console.log($scope.resultsAuthors);

		}, function error(res) {
			console.log(res);
		});
	}
}]);