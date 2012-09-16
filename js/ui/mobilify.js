/* 
 * Mobilify.js
 * Sweet things for iOS Safari
 *
 * Built by Ryhan Hassan
 */


// Hide the address bar
var hideAddressBar = function (){
	if(!window.location.hash){
		if(document.height < window.outerHeight){
			document.body.style.height = (window.outerHeight + 50) + 'px';
		}
		setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
	}
}
window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
window.addEventListener("orientationchange", hideAddressBar );

/* Optimize the search view */
$('#search').focus( function(){
	$('body').addClass('search');

	/*
	$('header').css({
		height: '0',
		opacity: '0'
	});*/
	window.scrollTo(0, 1);
	//document.body.setAttribute('data-view', 'search');
});