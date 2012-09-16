/*
 * Concierge.js
 * Client-side recommendation engine
 *
 * Written by Ryhan Hassan
 */

function suggestNames(s){

	return extendDomain(s);
	/*
	return _.flatten([
			extendDomain(s),
			extendDomain(dropVowels(s))
		]);
	*/
}

/* 
 * Given a string, return a 
 * all lowercase string that
 * lacks a, e, i, o, and u
 */
function dropVowels(s)
{ 
	return s.toLowerCase()
 			.replace(/a/g,'')
 			.replace(/e/g,'')
 			.replace(/i/g,'')
 			.replace(/o/g,'')
 			.replace(/u/g,'');
}

/* 
 * Given a string, return
 * an array of superstrings
 * that are prefixed and suffixed with
 * common domain name changes.
 */
function extendDomain(u)
{
	var prefixes = ['', 'get', 'go', 'try', 'the', 'just'],
		suffixes = ['', 'app', 'up', 'project', 'hq', 'it'];

	return _.flatten(_.map(prefixes, function(p){return _.map(suffixes, function(s){ return p + u + s;})}));

}

/*
var a = new Markov("Drop kick send twitter", 6),
	result = '';

a.each(function (v) {	result += v;});
*/