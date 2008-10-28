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
 * An extended Grid that can communicate with a layer to view its features
 * attributes or manually update from feature array data
 * 
 * @constructor
 * @base Ext.grid.GridPanel
 * @param {Object}
 *            config
 * @param {OpenLayers.Layer.Vector}
 *            config.layer
 */
WebGIS.AttributeGrid = function(config) {
	var layer = config.layer;

	// TODO: delay construction until first feature is added to layer

	// TODO: create column model from attributes (assume all features has the
	// same

	// TODO: populate grid from layer

	WebGIS.AttributeGrid.superclass.constructor.apply(this, arguments);
};

Ext.extend(WebGIS.AttributeGrid, Ext.grid.GridPanel);

Ext.reg('webgis-attributegrid', WebGIS.AttributeGrid);
