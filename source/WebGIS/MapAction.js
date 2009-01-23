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
		config.map = config.map ? config.map : WebGIS.MapAction.map;

		if (config.cls === 'x-btn-text-icon') {
			config.text = config.text || config.titleText;
		}
		config.tooltip = config.config || config.tooltipText;

		this.map = config.map;
		this.olcontrol = config.olcontrol;
		
		// rest of construction is only for MapActions using a OL control
		var olcontrol = this.olcontrol;
		if (!olcontrol) {	
			WebGIS.MapAction.superclass.constructor.call(this, config);
			return;
		}

		var map = this.map;
		
		/**
		 * function to handle activation of an OpenLayers control, will
		 * deactivate other controls scope is assumed to be the OpenLayers
		 * control itself
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

		Ext.apply(config, {
		    handler :mapActionHandler,
		    scope :olcontrol,
		    enableToggle :true,
		    toggleGroup :'WebGIS.MapAction'
		});
		
		WebGIS.MapAction.superclass.constructor.call(this, config);
	};
	
	/**
	 * Optional static map property. 
	 * 
	 * Will be used as the map parameter for all MapActions, which
	 * is useful if only one map instance is used in the application.
	 */
	WebGIS.MapAction.map = null;

	Ext.extend(WebGIS.MapAction, Ext.Action);

})();