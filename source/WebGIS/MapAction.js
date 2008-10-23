/**
 * WebGIS JS Library Copyright(c) 2008, Sweco Position
 * 
 * Licensed under GPLv3 http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 */

// need a private closure for this class
( function() {

	/**
	 * Private static array to manage activation/deactivation of added
	 * OpenLayers controls
	 */
	var openLayersControls = [];

	/**
	 * Handle interaction with OpenLayers and can be used as buttons, menu items
	 * and more in an Ext Js GUI. Note that this is because this class extends
	 * Ext.Action<br>
	 * <br>
	 * This class also handles OpenLayers.Control activation.<br>
	 * <br>
	 * OpenLayers can have several controls active, but MapAction restricts to
	 * one MapAction active at one time.<br>
	 * <br>
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
		/**
		 * @type OpenLayers.Map
		 * @private
		 */
		var map = config.map;

		WebGIS.MapAction.superclass.constructor.call(this, config);

		if (config.cls === 'x-btn-text-icon') {
			config.text = config.text || this.titleText;
		}
		config.tooltip = config.tooltip || this.tooltipText;

		// rest of construction is only for MapActions using a OL control
		/**
		 * @type OpenLayers.Control
		 * @private
		 */
		var olcontrol = this.olcontrol;
		if (!olcontrol)
			return;

		/**
		 * function to handle activation of an OpenLayers control, will
		 * deactivate other controls scope is assumed to be the OpenLayers
		 * control itself
		 * 
		 * @private
		 */
		var mapActionHandler = function(object, event) {
			for ( var i in openLayersControls) {
				var control = openLayersControls[i];

				if (control.deactivate) {
					control.deactivate();
				}
			}

			this.activate();

			// if this action is connected to a button, make sure it's toggled
			// if pressed twice
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
	};

	Ext.extend(WebGIS.MapAction, Ext.Action);

})();