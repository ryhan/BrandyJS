/* Search Controller */

// Store all search related values in this object
var searchModel = {};

// Add the inputs
searchModel.$searchInput = $('#search');
searchModel.searchInput = searchModel.$searchInput[0];

// Caching
searchModel.cachedQuery = "";
searchModel.lastUpdate = (new Date()).getTime();
searchModel.loadCount = 1;

// Define what happens when the input changes
searchModel.$searchInput.keyup(function() 
{
  searchModel.query = searchModel.searchInput.value;
  updateResults();

  setTimeout(updateResults, 500);
});

function updateResults()
{
	searchModel.query = searchModel.searchInput.value;

	// Check if we've given enough time between requests
	var currentTime = (new Date()).getTime();
	if (currentTime - searchModel.lastUpdate < 500)
	{
		return true;
	}

	// Check if there has been a change to the query
	if (searchModel.query == searchModel.cachedQuery)
	{
		searchModel.loadCount += 0.5;
	}
	else
	{
		searchModel.loadCount = 1;
	}
	searchModel.cachedQuery = searchModel.query;

	if (searchModel.query == "")
	{
		$('#results')[0].innerHTML = "";
		$('#helptext').css('opacity', 1);
		$('#loading').css({opacity: 0, height: 0});
		return true;
	}else
	{
		$('#helptext').css('opacity', 0);
		$('#loading').css({opacity: 1, height: '100px'});

		if (searchModel.loadCount >=30){
			$('#loading').css({opacity: 0, height: 0});
		}
	}

	// Make a new request

	searchModel.lastUpdate = currentTime;
	
	var suggestions = _.first(_.map(suggestNames(searchModel.query), function(v)
	{

		var highlighted = v.replace(searchModel.query, 
			"<strong>"+searchModel.query+"</strong>");
		
		return {
			id: v,
			text: highlighted
		};
	}), searchModel.loadCount);

	var ulContainer = document.createElement('div');
	var ul = document.createElement('ul');
	for( var i=0; i < suggestions.length; i++){
		var li = document.createElement('li');

		var text = document.createElement('span');
		text.innerHTML = suggestions[i].text;
		li.setAttribute('id','safeurl'+suggestions[i].id);
		li.appendChild(text);

		var availability = document.createElement('div');
		availability.setAttribute('class', 'availability');
		var status = availabilityChecks(suggestions[i].id);
		availability.innerHTML = status.html;
		li.appendChild(availability);

		if (status.allTaken == true)
		{
			li.setAttribute('class', 'taken');
		}

		ul.appendChild(li);
	}
	ulContainer.appendChild(ul);

	$('#results')[0].innerHTML = ulContainer.innerHTML;
	setTimeout(updateResults, 500);

}

function availabilityChecks(text){

	var twitter = isValidHandle(text);
	var com = isValidUrl("http://"+ text+ ".com");
	var me  = isValidUrl("http://"+ text+ ".me");

	var genSpan = function(s,bool){ 
		if (bool === false){ return "<span class='active'>"+s+"</span>";}
		if (bool === true){ return "<span class='taken'>"+s+"</span>";}
		return "<span>"+s+"</span>";
	};

	return {
		allTaken: (twitter == true && com == true && me == true),
		html: genSpan('@', twitter) + genSpan('.COM', com) + genSpan('.ME', me),
	};
}

function loading(){
	var opts = {
		lines: 13, // The number of lines to draw
		length: 7, // The length of each line
		width: 4, // The line thickness
		radius: 10, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		color: '#000', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	var target = document.getElementById('loading');
	var spinner = new Spinner(opts).spin(target);
}
loading();

/*
function searchCtrl($scope)
{
	// Query model
	$scope.query = "";
	$scope.cachedQuery = "";
	$scope.cachedResults = "";
	$scope.lastUpdate = (new Date()).getTime();

	// Results model
	$scope.results = function()
	{
		// Check if the current query is already cached
		if ($scope.query == $scope.cachedQuery)
		{
			return $scope.cachedResults;
		}

		// Get the current time
		var currentTime = (new Date()).getTime();

		// If the current time is sufficiently 
		// far enough away from the last update,
		// fetch the results again.
		if (currentTime - $scope.lastUpdate > 500)
		{
			$scope.lastUpdate = currentTime;
			return fetchResults();
		}
		else
		{
			return $scope.cachedResults;
		}
	};

	// Define how to get new results
	var fetchResults = function()
	{
		// Define how to update the cache
		var updateResultCache = function(arr){
			$scope.cachedQuery = $scope.query;
			$scope.cachedResults = arr;
			return arr;
		};

		// Handle empty query
		if ($scope.query == "")
		{ 
			return updateResultCache([]); 
		}

		// Suggest options
		var suggestions = _.map(suggestNames($scope.query), 
			function(v){return {text: v};});
		return updateResultCache(suggestions);
	};

}*/