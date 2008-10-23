/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview Editing map tools implemented as WebGIS.MapAction classes
 */

/**
 * Activates feature drawing on specified layer
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 * @cfg {OpenLayers.Layer.Vector} layer required
 * @cfg {String} geometryType required
 * @cfg {function} handler optional function to be called after each feature is
 *      drawn
 */
WebGIS.MapAction.DrawFeature = function(config) {
	// use config parameter to determine geometry type to handle
	if (config.geometryType === 'OpenLayers.Geometry.Point') {
		handler = OpenLayers.Handler.Point;
		config.iconCls = 'webgis-mapaction-drawpoint';
		this.titleText = this.titlePointText;
		this.tooltipText = this.tooltipPointText;
	} else if (config.geometryType === 'OpenLayers.Geometry.Curve') {
		handler = OpenLayers.Handler.Path;
		config.iconCls = 'webgis-mapaction-drawline';
		this.titleText = this.titleCurveText;
		this.tooltipText = this.tooltipCurveText;
	} else if (config.geometryType === 'OpenLayers.Geometry.Polygon') {
		handler = OpenLayers.Handler.Polygon;
		config.iconCls = 'webgis-mapaction-drawpolygon';
		this.titleText = this.titlePolygonText;
		this.tooltipText = this.tooltipPolygonText;
	}

	config.olcontrol = new OpenLayers.Control.DrawFeature(config.layer, handler);

	WebGIS.MapAction.DrawFeature.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.DrawFeature, WebGIS.MapAction);

/**
 * Selects a feature on specified layer
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 * @cfg {OpenLayers.Layer.Vector} layer required
 * @cfg {Object} options Optional options to pass to OpenLayers SelectFeature
 *      control
 */
WebGIS.MapAction.SelectFeature = function(config, options) {
	config.iconCls = 'webgis-mapaction-selectfeature';
	config.olcontrol = new OpenLayers.Control.SelectFeature(config.layer,
			config.options);

	WebGIS.MapAction.SelectFeature.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.SelectFeature, WebGIS.MapAction);

/**
 * Removes selected features
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 * @cfg {OpenLayers.Layer.Vector} layer required
 */
WebGIS.MapAction.RemoveSelectedFeatures = function(config) {
	config.iconCls = 'webgis-mapaction-removefeature';
	
	var layer = config.layer;
	
	/**
	 * @private
	 */
	var handler = function() {
		if (layer.selectedFeatures) {
			layer.removeFeatures(layer.selectedFeatures);
		}
	};
	
	config.handler = handler;

	WebGIS.MapAction.RemoveSelectedFeatures.superclass.constructor.call(this,
			config);
};
Ext.extend(WebGIS.MapAction.RemoveSelectedFeatures, WebGIS.MapAction);

/**
 * Activates feature modification on specified layer
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 * @cfg {OpenLayers.Layer.Vector} layer required
 */
WebGIS.MapAction.ModifyFeature = function(config) {
	config.iconCls = 'webgis-mapaction-modifyfeature';
	config.olcontrol = new OpenLayers.Control.ModifyFeature(config.layer);

	WebGIS.MapAction.ModifyFeature.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.ModifyFeature, WebGIS.MapAction);

/**
 * Activates feature dragging on specified layer
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @param {Object}
 *            config
 * @cfg {OpenLayers.Layer.Vector} layer required
 */
WebGIS.MapAction.DragFeature = function(config) {
	config.iconCls = 'webgis-mapaction-dragfeature';
	config.olcontrol = new OpenLayers.Control.DragFeature(config.layer);

	WebGIS.MapAction.DragFeature.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.DragFeature, WebGIS.MapAction);
