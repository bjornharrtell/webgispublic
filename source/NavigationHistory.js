/*global WebGIS, Ext */

/**
 * Keeps track of navigation history on the map
 * @param config
 */
WebGIS.NavigationHistory = function(config) {
	var map = config.map,
		currentHistoryPosition = 0,
		navigationHistory = [],
		processNewBounds;
	
	this.addEvents('historystatuschange');
	
	this.back = function() {
		if (currentHistoryPosition<(navigationHistory.length-1)) {
			currentHistoryPosition++;
			map.zoomToExtent(navigationHistory[currentHistoryPosition]);
		}
	};
	
	this.next = function() {
		if (currentHistoryPosition>0) {
			currentHistoryPosition--;
			map.zoomToExtent(navigationHistory[currentHistoryPosition]);
		}
	};
	
	processNewBounds = function() {		
		var previous = navigationHistory[currentHistoryPosition],
			previousHistory = true,
			nextHistory = true;

		if (navigationHistory.length < 2) {
			previousHistory = false;
			nextHistory = false;
		}
		else if (currentHistoryPosition === navigationHistory.length-1)	{
			previousHistory = false;
		}
		else if (currentHistoryPosition === 0)	{
			nextHistory = false;
		}
		
		this.fireEvent('historystatuschange', { previousHistory: previousHistory, nextHistory: nextHistory });
		
		//  abort if new extent equals the next/previous one			
		if (map.getExtent().equals(previous)) {
			return;
		}
		// add historic bounds to top of history
		navigationHistory.splice(0, 0, map.getExtent());
	};
	
	// call custom processing handler when map is done with move/zoom
	map.events.register('zoomend', this, processNewBounds);
	map.events.register('moveend', this, processNewBounds);
	
	// add first map extent to history
	navigationHistory.push(map.getExtent());
};

WebGIS.NavigationHistory.prototype = {};

Ext.extend(WebGIS.NavigationHistory, Ext.util.Observable);

