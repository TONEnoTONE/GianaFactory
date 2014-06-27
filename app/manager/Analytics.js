define(["GALocalStorage", "data/Version"], 
function(GALocalStorage, Version){
	
	var Analytics = function() {
		ga_storage._setAccount(Version.googleAnalyticsId);
	};

	Analytics.prototype.trackEvent = function (category, action, label, value) {
		if ( value ) {
			ga_storage._trackEvent(category, action, label, value.toString());
		} else if ( label ) {
			ga_storage._trackEvent(category, action, label);
		} else if ( action ) {
			ga_storage._trackEvent(category, action);
		} 		
	};

	Analytics = new Analytics();
	return Analytics;
});