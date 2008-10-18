/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 */

(function(){

/**
 * Private static array to manage activation/deactivation of added OpenLayers controls
 */
var openLayersControls = [];

/**
 * @class Abstract baseclass extended from Ext.Action to handle interaction with 
 * OpenLayers and can be used as buttons, menu items and more in an Ext Js GUI.
 *
 * This class also handles OpenLayers.Control activation and manages navigation history.
 * 
 * OpenLayers can have several controls active, but MapAction restricts to one
 * MapAction active at one time.
 *
 * @extends Ext.Action
 * @param {Object} config Ext.Action config options<br>
 {OpenLayers.Map} [map] Required config option
 */
WebGIS.MapAction = function(config) {
	var map = config.map,
		olcontrol = config.olcontrol,
		mapActionHandler;
	
	WebGIS.MapAction.superclass.constructor.call(this, config);

	if (config.cls === 'x-btn-text-icon') {
		config.text = config.text || this.titleText;
	}
	
	config.tooltip = config.tooltip || this.tooltipText;
	
	if (olcontrol) {
		// handler to handle activation of an OpenLayers control (need to deactivate other controls)
		// scope is assumed to be the OpenLayers control itself
		mapActionHandler = function(object, event) {
			for (var index in openLayersControls) {
				var control = openLayersControls[index];
				
				if (control.deactivate) {
					control.deactivate();
				}
			}

			this.activate();
			
			// if this action is connected to a button, make sure it's toggled if pressed twice
			if (object.toggle) {
				object.toggle(true);
			}
		};
	
		map.addControl(olcontrol);
		openLayersControls.push(olcontrol);
		config.handler = mapActionHandler;
		config.scope = olcontrol;
		config.enableToggle = true;
		config.toggleGroup = 'WebGIS.MapAction';
	}

};

WebGIS.MapAction.prototype = {};

Ext.extend(WebGIS.MapAction, Ext.Action);

})();