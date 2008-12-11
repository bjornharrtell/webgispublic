/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 */

/**
 * Activates interactive zoom in box on map
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 */
WebGIS.MapAction.ZoomInBox = function(config) {
	var map = config.map;

	Ext.apply(config, {
	    iconCls :'webgis-mapaction-zoominbox',
	    enableToggle :true,
	    toggleGroup :'WebGIS.MapAction'
	});

	this.olcontrol = new OpenLayers.Control.ZoomBox();

	var onZoomend = function() {
		if (map.numZoomLevels - 1 === map.getZoom()) {
			this.disable();
			this.each( function() {
				this.toggle(false);
			});
			this.olcontrol.deactivate();
		} else {
			this.enable();
		}
	};
	map.events.register('zoomend', this, onZoomend);

	WebGIS.MapAction.ZoomInBox.superclass.constructor.call(this, config);

};
Ext.extend(WebGIS.MapAction.ZoomInBox, WebGIS.MapAction);

/**
 * Activates interactive zoom out box on map
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 */
WebGIS.MapAction.ZoomOutBox = function(config) {
	var map = config.map;

	Ext.apply(config, {
	    iconCls :'webgis-mapaction-zoomoutbox',
	    enableToggle :true,
	    toggleGroup :'WebGIS.MapAction'
	});

	this.olcontrol = new OpenLayers.Control.ZoomBox( {
		out :true
	});

	var onZoomend = function() {
		if (0 === map.getZoom()) {
			this.disable();
			this.each( function() {
				this.toggle(false);
			});
			this.olcontrol.deactivate();
		} else {
			this.enable();
		}
	};
	map.events.register('zoomend', this, onZoomend);

	WebGIS.MapAction.ZoomOutBox.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ZoomOutBox, WebGIS.MapAction);

/**
 * Zooms in one zoomstep
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 */
WebGIS.MapAction.ZoomIn = function(config) {
	var map = config.map;
	
	Ext.apply(config, {
	    iconCls :'webgis-mapaction-zoomin',
	    handler : function() {
		    this.map.zoomIn();
	    }
	});
	
	var onZoomend = function() {
		if (map.numZoomLevels - 1 === map.getZoom()) {
			this.disable();
		} else {
			this.enable();
		}
	};
	map.events.register('zoomend', this, onZoomend);

	WebGIS.MapAction.ZoomIn.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ZoomIn, WebGIS.MapAction);

/**
 * Zooms out one zoomstep
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 */
WebGIS.MapAction.ZoomOut = function(config) {
	var map = config.map;
	
	Ext.apply(config, {
	    iconCls :'webgis-mapaction-zoomout',
	    handler : function() {
		    this.map.zoomOut();
	    }
	});
	
	var onZoomend = function() {
		if (0 === map.getZoom()) {
			this.disable();
		} else {
			this.enable();
		}
	};
	map.events.register('zoomend', this, onZoomend);

	WebGIS.MapAction.ZoomOut.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ZoomOut, WebGIS.MapAction);

/**
 * Zooms map to full extent
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 */
WebGIS.MapAction.FullExtent = function(config) {
	Ext.apply(config, {
	    iconCls :'webgis-mapaction-fullextent',
	    handler : function() {
		    this.map.zoomToMaxExtent();
	    }
	});

	WebGIS.MapAction.FullExtent.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.FullExtent, WebGIS.MapAction);

/**
 * Activates interactive drag pan on map
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 */
WebGIS.MapAction.DragPan = function(config) {
	Ext.apply(config, {
	    iconCls :'webgis-mapaction-dragpan',
	    enableToggle :true,
	    toggleGroup :'WebGIS.MapAction'
	});

	this.olcontrol = new OpenLayers.Control.DragPan();

	WebGIS.MapAction.DragPan.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.DragPan, WebGIS.MapAction);

// private closure for the navigation history stuff
( function() {

	/**
	 * Manages navigation history
	 * 
	 * @constructor
	 */
	var NavigationHistory = function(config) {
		var map = config.map;
		var currentHistoryPosition = 0;
		var navigationHistory = [];

		this.addEvents('historystatuschange');

		this.back = function() {
			if (currentHistoryPosition < (navigationHistory.length - 1)) {
				currentHistoryPosition++;
				map.zoomToExtent(navigationHistory[currentHistoryPosition]);
			}
		};

		this.next = function() {
			if (currentHistoryPosition > 0) {
				currentHistoryPosition--;
				map.zoomToExtent(navigationHistory[currentHistoryPosition]);
			}
		};

		var processNewBounds = function() {
			var previous = navigationHistory[currentHistoryPosition], previousHistory = true, nextHistory = true;

			if (navigationHistory.length < 2) {
				previousHistory = false;
				nextHistory = false;
			} else if (currentHistoryPosition === navigationHistory.length - 1) {
				previousHistory = false;
			} else if (currentHistoryPosition === 0) {
				nextHistory = false;
			}

			this.fireEvent('historystatuschange', {
			    previousHistory :previousHistory,
			    nextHistory :nextHistory
			});

			// abort if new extent equals the next/previous one
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

	Ext.extend(NavigationHistory, Ext.util.Observable);

	/**
	 * Singleton instance for navigation history used by the related mapactions
	 */
	var navigationHistoryInstance;

	/**
	 * @constructor
	 * @base WebGIS.MapAction
	 * @param {Object}
	 *            config
	 */
	WebGIS.MapAction.PreviousExtent = function(config) {
		Ext.apply(config, {
		    iconCls :'webgis-mapaction-previousextent',
		    disabled :true
		});

		if (!navigationHistoryInstance) {
			navigationHistoryInstance = new NavigationHistory( {
				map :config.map
			});
		}

		config.handler = navigationHistoryInstance.back;

		navigationHistoryInstance.on('historystatuschange', function(e) {
			e.previousHistory ? this.enable() : this.disable();
		}, this);

		WebGIS.MapAction.PreviousExtent.superclass.constructor.call(this, config);
	};
	Ext.extend(WebGIS.MapAction.PreviousExtent, WebGIS.MapAction);

	/**
	 * @constructor
	 * @base WebGIS.MapAction
	 * @param {Object}
	 *            config
	 */
	WebGIS.MapAction.NextExtent = function(config) {
		Ext.apply(config, {
		    iconCls :'webgis-mapaction-nextextent',
		    disabled :true
		});

		if (!navigationHistoryInstance) {
			navigationHistoryInstance = new NavigationHistory( {
				map :config.map
			});
		}

		config.handler = navigationHistoryInstance.next;

		navigationHistoryInstance.on('historystatuschange', function(e) {
			e.nextHistory ? this.enable() : this.disable();
		}, this);

		WebGIS.MapAction.NextExtent.superclass.constructor.call(this, config);
	};
	Ext.extend(WebGIS.MapAction.NextExtent, WebGIS.MapAction);

})();
