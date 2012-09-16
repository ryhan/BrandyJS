/*
 * Twitter Handler
 * Check if a Twitter handle is available
 * 
 * isValidHandle(handle)
 */

// Key-Value pairing for Twitter handle occupancy
var twitterStore = {};

// Check if a value is valid
var notEmpty = function(v){ return (v!=undefined && v!=null); };

function isValidHandle(handle)
{
	if (notEmpty(twitterStore[handle]))
	{
		// We've already looked up this handle, 
		// so just return the cached result.
		return twitterStore[handle];
	}
	else
	{
		// Query YQL to lookup the content at the handle
		twitterLookup(handle, function(data){
			twitterStore[handle] = notEmpty(data.query.results);
			return twitterStore[handle];
		});

		return 'requested';
	}
}


function twitterLookup(handle, success)
{
	$.ajax({
	  url : 'http://query.yahooapis.com/v1/public/yql',
	  jsonp : 'callback',
	  dataType : 'jsonp',
	  data : {
	    q : "select * from html where url=\"http://twitter.com/" 
	    	+ handle 
	    	+ "\" and xpath='//div[contains(concat(\"\",normalize-space(@class),\"\"),\"profile-card\")]'",
	    format : 'json'
	  },
	  success : function(data){ return success(data);}
	});
}

