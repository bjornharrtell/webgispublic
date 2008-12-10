/**
 * WebGIS JS Library Copyright(c) 2008, Sweco Position
 * 
 * Licensed under GPLv3 http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 */

/**
 * A panel containing a OpenLayers.Map instance, with the purpose of making it
 * easier to connect a OpenLayers.Map to a panel that is created without
 * existing HTML markup.<br>
 * <br>
 * The OpenLayers.Map will automatically be rendered to the panels body at the
 * appropriate time and resized if needed.
 * 
 * @constructor
 * @base Ext.Panel
 * @param {Object}
 *            config
 * @param {Object}
 *            mapOptions
 * @event afterMapRender Triggered when the OpenLayers.Map instance is
 *        initialized and rendered to the DOM
 */
WebGIS.MapPanel = function(config) {
	var mapOptions = config.mapOptions;
	// var layers = config.layers;

	WebGIS.MapPanel.superclass.constructor.apply(this, arguments);

	this.addEvents( {
		'afterMapRender' :true
	});

	/**
	 * This function will create the OpenLayers.Map instance. Note that this override seem to be the one that gives most reliable map sizes at initialization time when used in various Ext layouts
	 * 
	 * @private
	 */
	var onAfterRender = function() {
		WebGIS.MapPanel.superclass.afterRender.apply(this, arguments);

		this.map = new OpenLayers.Map(this.body.dom, mapOptions);

		this.fireEvent('afterMapRender');
	};
	this.override( {
		afterRender :onAfterRender
	});

	/**
	 * This function will create the OpenLayers.Map instance. Note that this override seem to be the one that gives most reliable map sizes at initialization time when used in various Ext layouts
	 * 
	 * @private
	 */
	var onResize = function() {
		WebGIS.MapPanel.superclass.onResize.apply(this, arguments);

		this.map.updateSize();
	};
	this.override( {
		onResize :onResize
	});

};

Ext.extend(WebGIS.MapPanel, Ext.Panel);

Ext.reg('webgis-mappanel', WebGIS.MapPanel);
