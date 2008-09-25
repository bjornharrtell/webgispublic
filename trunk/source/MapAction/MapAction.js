/**
 * WebGIS JS Library
 * Copyright(c) 2007, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview WebGIS.MapAction base class implementation
 */
 
Ext.namespace('WebGIS');

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
WebGIS.MapAction = Ext.extend(Ext.Action, {
    constructor: function(config) {
        WebGIS.MapAction.superclass.constructor.call(this, config);
    
        // if locale is defined and css is button with icon and text, then set text to locale string for title
        if (this.titleText) {
            if (config.cls === 'x-btn-text-icon'){
                config.text = this.titleText;
            }
        }
        if (this.tooltipText) {
            config.tooltip = this.tooltipText;
        }
        
        // if a olcontrol is specified, handle it globally
        if (config.olcontrol)
        {
            // handler to handle activation of an OpenLayers control (need to deactivate other controls)
            // scope is assumed to be the OpenLayers control itself
            var mapActionHandler = function(object, event) {
                for (index in WebGIS.MapAction.openLayersControls) {
                    var control = WebGIS.MapAction.openLayersControls[index];
                    
                    if (control.deactivate) control.deactivate();
                }

            	this.activate();
            	
            	// if this action is connected to a button, make sure it's toggled if pressed twice
            	if (object.toggle) object.toggle(true);
            };
        
            config.map.addControl(config.olcontrol);
            WebGIS.MapAction.openLayersControls.push(config.olcontrol);
            config.handler = mapActionHandler;
            config.scope = config.olcontrol;
            config.enableToggle = true;
            config.toggleGroup = 'WebGIS.MapAction';
        }
        
        // initalize navigation history (only do this once)
        if (!WebGIS.MapAction.navigationHistoryInitialized) WebGIS.MapAction.initNavigationHistory(config.map); 
    }
});

/**
 * @private
 */
WebGIS.MapAction.initNavigationHistory = function(map) {
    var processNewBounds = function() {
        var previous = WebGIS.MapAction.navigationHistory[WebGIS.MapAction.currentHistoryPosition];

        // map is done with move/zoom so enable navigation tools
        for (i=0; i<WebGIS.MapAction.navigationActions.length; i++) WebGIS.MapAction.navigationActions[i].enable();

        // check where we are in navigation history and disable related actions
        if (WebGIS.MapAction.navigationHistory.length < 2){
            for (i=0; i<WebGIS.MapAction.nextExtentActions.length; i++) WebGIS.MapAction.nextExtentActions[i].disable();
            for (i=0; i<WebGIS.MapAction.previousExtentActions.length; i++) WebGIS.MapAction.previousExtentActions[i].disable();
        }
        else if (WebGIS.MapAction.currentHistoryPosition == WebGIS.MapAction.navigationHistory.length-1)	{
            for (i=0; i<WebGIS.MapAction.previousExtentActions.length; i++) WebGIS.MapAction.previousExtentActions[i].disable();
        }
        else if (WebGIS.MapAction.currentHistoryPosition == 0)	{
            for (i=0; i<WebGIS.MapAction.nextExtentActions.length; i++) WebGIS.MapAction.nextExtentActions[i].disable();
        }

        //  abort if new extent equals the next/previous one			
        if (this.getExtent().equals(previous)) return;

        // add historic bounds to top of history
        WebGIS.MapAction.navigationHistory.splice(0, 0, this.getExtent());
    };
    
    // call custom processing handler when map is done with move/zoom
    map.events.register('zoomend', map, processNewBounds);
    map.events.register('moveend', map, processNewBounds);
    
    // add first map extent to history
    WebGIS.MapAction.navigationHistory.push(map.getExtent());
    WebGIS.MapAction.navigationHistoryInitialized = true;
};

/**
 * Static array to manage activation/deactivation of added OpenLayers controls
 * @private
 */
WebGIS.MapAction.openLayersControls = [];

/**
 * Static array to manage instances of all instant selection related MapActions
 * @private
 */
WebGIS.MapAction.selectionActions = [];

/**
 * Static array to manage instances of all instant navigation related MapActions
 * @private
 */
WebGIS.MapAction.navigationActions = [];

/**
 * Static array to manage instances of MapAction.PreviousEXtent
 * @private
 */
WebGIS.MapAction.previousExtentActions = [];

/**
 * Static array to manage instances of MapAction.NextEXtent
 * @private
 */
WebGIS.MapAction.nextExtentActions = [];

/**
 * Static array to manage navigation and history
 * @private
 */
WebGIS.MapAction.navigationHistory = [];

/**
 * Static bool to indicate if navigation history has been initalized
 * @private
 */
WebGIS.MapAction.navigationHistoryInitialized = false;

/**
 * Static int representing current navigation history position
 * @private
 */
WebGIS.MapAction.currentHistoryPosition = 0;
