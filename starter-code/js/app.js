/* put js code here */

console.log('this file is running.');

var redApp = angular.module('redApp', []);

redApp.controller('RedCtrl', ['$scope', '$http', function($scope, $http) {
	//instantiate search term
	$scope.searchTerm = '';
	$scope.title = '';
	$scope.permalink = '';
	$scope.author = '';
	$scope.image = '';
	$scope.score = '';
	$scope.resultsTitles =[];
	$scope.resultspermas = [];
	$scope.resultsAuthors = [];
	$scope.searchHist = [];
	$scope.resultsImages = [];
	$scope.resultsScores = [];

	//page load
	 var load = function () {
		var newtaco = JSON.parse(window.localStorage.taco);
		$scope.searchHist = newtaco;
	}

	//immmediately call load function
	load();

	//search function
	$scope.search = function() {
		var req = {
			url: "https://www.reddit.com/search.json?q=" + $scope.searchTerm,
			method: 'GET',
			
			//params only for when the url has a ? or a q before the query
			// params: {gi
			// 	q:$scope.searchTerm
			// }
		}

		$scope.searchHist.push($scope.searchTerm);
		var taco = $scope.searchHist;
		window.localStorage.taco=JSON.stringify(taco);
		// console.log(window.localStorage.taco);


		$http(req).then(function success(res) {
			$scope.resultsTitles =[];
			$scope.resultspermas = [];
			$scope.resultsAuthors = [];
			$scope.resultsImages = [];
			$scope.resultsScores = [];

			var redData = res.data.data.children;
			// console.log(redData);
			for(var i=0; i<25; i++) {
				$scope.title = redData[i].data.title;
				$scope.author = redData[i].data.author;
				$scope.permalink = 'http://reddit.com' + redData[i].data.permalink;
				$scope.image = redData[i].data.url;
				$scope.score = redData[i].data.score;
				$scope.resultsTitles.push($scope.title);
				$scope.resultspermas.push($scope.permalink);
				$scope.resultsAuthors.push($scope.author);
				$scope.resultsScores.push($scope.score);
				if(redData[i].data.domain == "i.imgur.com") {
					$scope.resultsImages.push($scope.image);
				}
			} 
		// console.log($scope.resultsImages);
		// console.log($scope.resultspermas);
		// console.log($scope.resultsAuthors);

		}, function error(res) {
			console.log(res);
		});
	}

	$scope.history = function(aa) {
		$scope.searchTerm= aa;
		var req = {
			url: "https://www.reddit.com/search.json?q=" + $scope.searchTerm,
			method: 'GET',
		}

		$http(req).then(function success(res) {
			$scope.resultsTitles =[];
			$scope.resultspermas = [];
			$scope.resultsAuthors = [];
			$scope.resultsImages = [];
			$scope.resultsScores = [];

			var redData = res.data.data.children;
			// console.log(redData);
			for(var i=0; i<25; i++) {
				$scope.title = redData[i].data.title;
				$scope.author = redData[i].data.author;
				$scope.permalink = 'http://reddit.com' + redData[i].data.permalink;
				$scope.image = redData[i].data.url;
				$scope.score = redData[i].data.score;
				$scope.resultsTitles.push($scope.title);
				$scope.resultspermas.push($scope.permalink);
				$scope.resultsAuthors.push($scope.author);
				$scope.resultsScores.push($scope.score);
				if(redData[i].data.domain == "i.imgur.com") {
					$scope.resultsImages.push($scope.image);
				}
			} 
		// console.log($scope.resultsImages);
		// console.log($scope.resultspermas);
		// console.log($scope.resultsAuthors);

		}, function error(res) {
			console.log(res);
		});
	}

	$scope.deletehist = function(bb) {
		var del = $scope.searchHist.indexOf(bb);
		$scope.searchHist.splice(del, 1);
		var taco = $scope.searchHist;
		window.localStorage.taco=JSON.stringify(taco);
	}
}]);