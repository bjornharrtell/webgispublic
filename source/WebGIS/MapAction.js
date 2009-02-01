/**
 * WebGIS JS Library Copyright(c) 2008, Sweco Position
 * 
 * Licensed under GPLv3 http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 */

/**
 * Handle interaction with OpenLayers and can be used as buttons, menu items and
 * more in an Ext Js GUI. Note that this is because this class extends
 * Ext.Action<br>
 * <br>
 * This class also handles OpenLayers.Control activation.<br>
 * <br>
 * OpenLayers can have several controls active, but MapAction restricts to one
 * MapAction active at one time.<br>
 * 
 * @constructor
 * @base Ext.Action
 * @param {Object}
 *            config
 * @param {OpenLayers.Map}
 *            config.map required
 * @param {OpenLayers.Control}
 *            config.olcontrol optional
 */
WebGIS.MapAction = function(config) {
	config.map = config.map || WebGIS.MapAction.map;
	var map = config.map;
	var olcontrol = config.olcontrol;

	if (config.cls === 'x-btn-text-icon') {
		config.text = config.text || config.titleText;
	}
	config.tooltip = config.config || config.tooltipText;

	this.map = map;
	this.olcontrol = olcontrol;

	// rest of construction is only for MapActions using an OL control
	if (!olcontrol) {
		WebGIS.MapAction.superclass.constructor.call(this, config);
		return;
	}

	/**
	 * Handles activation of the current OpenLayers control
	 * 
	 * Scope is assumed to be the OpenLayers control itself.
	 */
	var handler = function(object, event) {
		for ( var i = 0; i < WebGIS.MapAction.olcontrols.length; i++) {
			WebGIS.MapAction.olcontrols[i].deactivate();
		}

		this.activate();

		// if this action is connected to a button, make sure it's toggled
		// if pressed twice
		if (object.toggle) {
			object.toggle(true);
		}
	};

	map.addControl(olcontrol);
	WebGIS.MapAction.olcontrols.push(olcontrol);

	// apply default config for a toggling action
	Ext.apply(config, {
	    handler :handler,
	    scope :olcontrol,
	    enableToggle :true,
	    toggleGroup :'WebGIS.MapAction'
	});

	WebGIS.MapAction.superclass.constructor.call(this, config);
};

/**
 * Optional static map property
 * 
 * Will be used as the map parameter for all MapActions, useful if only
 * one map instance is used in the application.
 */
WebGIS.MapAction.map = null;

/**
 * Static array of the OpenLayers.Controls currently handled by MapActions
 * 
 * TODO: should be per map not global
 */
WebGIS.MapAction.olcontrols = [];

Ext.extend(WebGIS.MapAction, Ext.Action);
