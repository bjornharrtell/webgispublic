/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview Basic identify tools implemented as WebGIS.MapAction classes
 */

/**
 * Identifies on clicked position
 * 
 * @constructor
 * @base WebGIS.MapAction
 * @required OpenLayers.Control.Identify
 * @param {Object}
 *            config
 * @param {WebGIS.Control.Toc}
 *            config.toc required
 * @param {String/DOM.Element/Ext.Element}
 *            config.resultTo Optional config option, if not specified identify
 *            will open its result in a floating window
 */
WebGIS.MapAction.Identify = function(config) {
	// default config for this action, also used by button to make it toggle correctly
	Ext.apply(config, {
	    iconCls :'webgis-mapaction-identify',
	    enableToggle :true,
	    toggleGroup :'WebGIS.MapAction'
	});
	
	if (!config.resultTo) {
		config.resultTo = new Ext.Window( {
			title :config.text,
			closeAction :'hide',
			width :300,
			autoHeight :true
		});
	}

	// define an OpenLayers control for this MapAction (is handled by MapAction constructor)
	this.olcontrol = new OpenLayers.Control.Identify( {
		toc :config.toc,
		resultTo :config.resultTo
	});

	// call Ext.Action constructor
	WebGIS.MapAction.Identify.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.Identify, WebGIS.MapAction);
