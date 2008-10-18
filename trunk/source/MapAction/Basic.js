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
 * @base WebGIS.MapAction
 * @param {Object} config
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
WebGIS.MapAction.ZoomInBox.prototype = {};
Ext.extend(WebGIS.MapAction.ZoomInBox, WebGIS.MapAction);

/**
 * @class Activates interactive zoom out box on map
 * @base WebGIS.MapAction
 * @param {Object} config
 */
WebGIS.MapAction.ZoomOutBox = function(config) {
	config.iconCls = 'webgis-mapaction-zoomoutbox';
	config.olcontrol = new OpenLayers.Control.ZoomBox({out:true});
	
	WebGIS.MapAction.ZoomOutBox.superclass.constructor.call(this, config);
};
WebGIS.MapAction.ZoomOutBox.prototype = {};
Ext.extend(WebGIS.MapAction.ZoomOutBox, WebGIS.MapAction);

/**
 * @class Zooms in one zoomstep
 * @base WebGIS.MapAction
 * @param {Object} config
 */
WebGIS.MapAction.ZoomIn = function(config) {
	config.iconCls = 'webgis-mapaction-zoomin';
	config.handler = function() {
		this.map.zoomIn();
	};
	
	WebGIS.MapAction.ZoomIn.superclass.constructor.call(this, config);
};
WebGIS.MapAction.ZoomIn.prototype = {};
Ext.extend(WebGIS.MapAction.ZoomIn, WebGIS.MapAction);

/**
 * @class Zooms out one zoomstep
 * @base WebGIS.MapAction
 * @param {Object} config
 */
WebGIS.MapAction.ZoomOut = function(config) {
	config.iconCls = 'webgis-mapaction-zoomout';
	config.handler = function() {
		this.map.zoomOut();
	};
	
	WebGIS.MapAction.ZoomOut.superclass.constructor.call(this, config);
};
WebGIS.MapAction.ZoomOut.prototype = {};
Ext.extend(WebGIS.MapAction.ZoomOut, WebGIS.MapAction);

/**
 * @class Zooms map to full extent
 * @base WebGIS.MapAction
 * @param {Object} config
 */
WebGIS.MapAction.FullExtent = function(config) {
	config.iconCls = 'webgis-mapaction-fullextent';
	config.handler = function() {
		this.map.zoomToMaxExtent();
	};

	WebGIS.MapAction.FullExtent.superclass.constructor.call(this, config);
};
WebGIS.MapAction.FullExtent.prototype = {};
Ext.extend(WebGIS.MapAction.FullExtent, WebGIS.MapAction);

/**
 * @class Activates interactive drag pan on map
 * @base WebGIS.MapAction
 * @param {Object} config
 */
WebGIS.MapAction.DragPan = function(config) {
	config.iconCls = 'webgis-mapaction-dragpan';
	config.enableToggle = true;
	config.toggleGroup = 'WebGIS.MapAction';
	config.olcontrol = new OpenLayers.Control.DragPan();
	
	WebGIS.MapAction.DragPan.superclass.constructor.call(this, config);
};
WebGIS.MapAction.DragPan.prototype = {};
Ext.extend(WebGIS.MapAction.DragPan, WebGIS.MapAction);

/**
 * @class
 * @base WebGIS.MapAction
 * @param {Object} config
 */
WebGIS.MapAction.PreviousExtent = function(config) {
	config.iconCls = 'webgis-mapaction-previousextent';
	config.disabled = true;
	config.handler = config.navigationHistory.back;
	
	config.navigationHistory.on('historystatuschange', function(e) {
			if (e.previousHistory === true) { 
				this.enable();
			}
			else {
				this.disable();
			}
		},
		this
	);
	
	WebGIS.MapAction.PreviousExtent.superclass.constructor.call(this, config);
};
WebGIS.MapAction.PreviousExtent.prototype = {};
Ext.extend(WebGIS.MapAction.PreviousExtent, WebGIS.MapAction);

/**
 * @class
 * @base WebGIS.MapAction
 * @param {Object} config
 */
WebGIS.MapAction.NextExtent = function(config) {
	config.iconCls = 'webgis-mapaction-nextextent';
	config.disabled = true;
	config.handler = config.navigationHistory.next;
	
	config.navigationHistory.on('historystatuschange', function(e) {
			if (e.nextHistory) { 
				this.enable();
			}
			else {
				this.disable();
			}
		},
		this
	);
	
	WebGIS.MapAction.NextExtent.superclass.constructor.call(this, config);
};
WebGIS.MapAction.NextExtent.prototype = {};
Ext.extend(WebGIS.MapAction.NextExtent, WebGIS.MapAction);
