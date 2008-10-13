/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview Basic map tools implemented as WebGIS.MapAction classes
 */

/**
 * @class Activates interactive zoom in box on map
 * @extends WebGIS.MapAction
 * @param {String} config WebGIS.MapAction config options
 */
WebGIS.MapAction.ZoomInBox = function(config) {
	// default config for this action, also used by button to make it toggle correctly
	config.iconCls = 'webgis-mapaction-zoominbox';
	config.enableToggle = true;
	config.toggleGroup = 'WebGIS.MapAction';
	
	// define an OpenLayers control for this MapAction (is handled by MapAction constructor)
	config.olcontrol = new OpenLayers.Control.ZoomBox();
	
	// call Ext.Action constructor
	WebGIS.MapAction.ZoomInBox.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ZoomInBox, WebGIS.MapAction);

/**
 * @class Activates interactive zoom out box on map
 * @extends WebGIS.MapAction
 * @param {String} config WebGIS.MapAction config options
 */
WebGIS.MapAction.ZoomOutBox = function(config) {
	config.iconCls = 'webgis-mapaction-zoomoutbox';
	config.olcontrol = new OpenLayers.Control.ZoomBox({out:true});
	
	WebGIS.MapAction.ZoomOutBox.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ZoomOutBox, WebGIS.MapAction);

/**
 * @class Zooms in one zoomstep
 * @extends WebGIS.MapAction
 * @param {String} config WebGIS.MapAction config options
 */
WebGIS.MapAction.ZoomIn = function(config) {
	config.iconCls = 'webgis-mapaction-zoomin';
	config.handler = function() {
		this.map.zoomIn();
	};
	
	WebGIS.MapAction.navigationActions.push(this);
	
	WebGIS.MapAction.ZoomIn.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ZoomIn, WebGIS.MapAction);

/**
 * @class Zooms out one zoomstep
 * @extends WebGIS.MapAction
 * @param {String} config WebGIS.MapAction config options
 */
WebGIS.MapAction.ZoomOut = function(config) {
	config.iconCls = 'webgis-mapaction-zoomout';
	config.handler = function() {
		this.map.zoomOut();
	};
	
	WebGIS.MapAction.navigationActions.push(this);
	
	WebGIS.MapAction.ZoomOut.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ZoomOut, WebGIS.MapAction);

/**
 * @class Zooms map to full extent
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options
 */
WebGIS.MapAction.FullExtent = function(config) {
	config.iconCls = 'webgis-mapaction-fullextent';
	config.handler = function() {
		this.map.zoomToMaxExtent();
	};
	
	WebGIS.MapAction.navigationActions.push(this);
	
	WebGIS.MapAction.FullExtent.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.FullExtent, WebGIS.MapAction);

/**
 * @class Activates interactive drag pan on map
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options
 */
WebGIS.MapAction.DragPan = function(config) {
	config.iconCls = 'webgis-mapaction-dragpan';
	config.enableToggle = true;
	config.toggleGroup = 'WebGIS.MapAction';
	config.olcontrol = new OpenLayers.Control.DragPan();
	
	WebGIS.MapAction.DragPan.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.DragPan, WebGIS.MapAction);

/**
 * @class
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options
 */
WebGIS.MapAction.PreviousExtent = function(config) {
	config.iconCls = 'webgis-mapaction-previousextent';
	config.disabled = true;
	config.handler = function() {
		if (WebGIS.MapAction.currentHistoryPosition<(WebGIS.MapAction.navigationHistory.length-1)) {
			WebGIS.MapAction.currentHistoryPosition++;
			this.map.zoomToExtent(WebGIS.MapAction.navigationHistory[WebGIS.MapAction.currentHistoryPosition]);
		}
	};
	
	WebGIS.MapAction.navigationActions.push(this);
	WebGIS.MapAction.previousExtentActions.push(this);
	
	WebGIS.MapAction.PreviousExtent.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.PreviousExtent, WebGIS.MapAction);

/**
 * @class
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options
 */
WebGIS.MapAction.NextExtent = function(config) {
	config.iconCls = 'webgis-mapaction-nextextent';
	config.disabled = true;
	config.handler = function() {
		if (WebGIS.MapAction.currentHistoryPosition>0) {
			WebGIS.MapAction.currentHistoryPosition--;
			this.map.zoomToExtent(WebGIS.MapAction.navigationHistory[WebGIS.MapAction.currentHistoryPosition]);
		}
	};
	
	WebGIS.MapAction.navigationActions.push(this);
	WebGIS.MapAction.nextExtentActions.push(this);
	
	WebGIS.MapAction.NextExtent.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.NextExtent, WebGIS.MapAction);
