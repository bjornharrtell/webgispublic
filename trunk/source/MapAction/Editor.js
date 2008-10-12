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

Ext.namespace('WebGIS', 'WebGIS.MapAction');

/**
 * @class Activates feature drawing on specified layer.
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options<br>
 {OpenLayers.Layer.Vector} [layer] Required config option<br>
 {String} [geometryType] Required config option<br>
 {Function} [handler] Optional config option. function to be called after each feature is drawn<br>
 */
WebGIS.MapAction.DrawFeature = function(config) {

	// use config parameter to determine geometry type to handle
	if (config.geometryType=='OpenLayers.Geometry.Point') {
		handler = OpenLayers.Handler.Point;
		config.iconCls = 'webgis-mapaction-drawpoint';
		this.titleText = this.titlePointText;
		this.tooltipText = this.tooltipPointText;
	}
	else if (config.geometryType=='OpenLayers.Geometry.Curve') {
		handler = OpenLayers.Handler.Path;
		config.iconCls = 'webgis-mapaction-drawline';
		this.titleText = this.titleCurveText;
		this.tooltipText = this.tooltipCurveText;
	}
	else if (config.geometryType=='OpenLayers.Geometry.Polygon') {
		handler = OpenLayers.Handler.Polygon;
		config.iconCls = 'webgis-mapaction-drawpolygon';
		this.titleText = this.titlePolygonText;
		this.tooltipText = this.tooltipPolygonText;
	}

	config.olcontrol = new OpenLayers.Control.DrawFeature(config.layer, handler);

	WebGIS.MapAction.DrawFeature.superclass.constructor.call(this, config);
}
Ext.extend(WebGIS.MapAction.DrawFeature, WebGIS.MapAction);


/**
 * @class Selects a feature on specified layer
 * @extends WebGIS.MapAction
 * @param {String} config WebGIS.MapAction config options<br>
 {OpenLayers.Layer.Vector} [layer] Required config option<br>
 {Object} [options] Optional options to pass to OpenLayers SelectFeature control<br>
 */
WebGIS.MapAction.SelectFeature = function(config, options) {
	config.iconCls = 'webgis-mapaction-selectfeature';
	config.olcontrol = new OpenLayers.Control.SelectFeature(config.layer, options);
	
	var onFeatureselected = function() {
		for (i=0; i<WebGIS.MapAction.selectionActions.length; i++) WebGIS.MapAction.selectionActions[i].enable();
	}
	
	var onFeatureunselected = function() {
		if (!this.layer.selectedFeatures) {
			for (i=0; i<WebGIS.MapAction.selectionActions.length; i++) WebGIS.MapAction.selectionActions[i].disabled();
		}
		
		if (this.layer.selectedFeatures) {
			if (this.layer.selectedFeatures.length===0) {
				for (i=0; i<WebGIS.MapAction.selectionActions.length; i++) WebGIS.MapAction.selectionActions[i].disabled();
			}
		}
	}
	
	config.layer.events.register('featureselected', onFeatureselected, this);
	config.layer.events.register('featureunselected', onFeatureselected, this);
	config.layer.events.register('featureunselected', onFeatureselected, this);

	WebGIS.MapAction.SelectFeature.superclass.constructor.call(this, config);
}
Ext.extend(WebGIS.MapAction.SelectFeature, WebGIS.MapAction);

/**
 * @class Removes a feature on specified layer
 * @extends WebGIS.MapAction
 * @param {String} config WebGIS.MapAction config options<br>
 {OpenLayers.Layer.Vector} [layer] Required config option<br>
 */
WebGIS.MapAction.RemoveSelectedFeatures = function(config) {
	config.iconCls = 'webgis-mapaction-removefeature';
	
	config.handler = function() {
		var layer = this.selectFeatures.layer;
	
		for (index in layer.selectedFeatures) {
			var feature = layer.selectedFeatures[index];
			
			layer.removeFeature(feature);
		}
	}
	
	WebGIS.MapAction.selectionActions.push(this);

	WebGIS.MapAction.RemoveSelectedFeatures.superclass.constructor.call(this, config);
}
Ext.extend(WebGIS.MapAction.RemoveSelectedFeatures, WebGIS.MapAction);

/**
 * @class Activates feature modification on specified layer.
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options<br>
 {OpenLayers.Layer.Vector} [layer] Required config option<br>
 */
WebGIS.MapAction.ModifyFeature = function(config) {
	config.iconCls = 'webgis-mapaction-modifyfeature';
	config.olcontrol = new OpenLayers.Control.ModifyFeature(config.layer);

	WebGIS.MapAction.ModifyFeature.superclass.constructor.call(this, config);
}
Ext.extend(WebGIS.MapAction.ModifyFeature, WebGIS.MapAction);

/**
 * @class Activates feature dragging on specified layer.
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options<br>
 {OpenLayers.Layer.Vector} [layer] Required config option<br>
 */
WebGIS.MapAction.DragFeature = function(config) {
	config.iconCls = 'webgis-mapaction-dragfeature';
	config.olcontrol = new OpenLayers.Control.DragFeature(config.layer);

	WebGIS.MapAction.DragFeature.superclass.constructor.call(this, config);
}
Ext.extend(WebGIS.MapAction.DragFeature, WebGIS.MapAction);
