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
 * Scalelist implemented as an Ext JS combobox extension
 * 
 * @constructor
 * @base Ext.form.ComboBox
 * @param {Object}
 *            config
 * @param {OpenLayers.Map}
 *            config.map required
 */
WebGIS.ScaleList = function(config) {
	var store = new Ext.data.SimpleStore( {
		fields : [ 'res', 'scale' ]
	});
	var map = config.map;

	Ext.apply(this, {
		valueField :'zoomlevel',
		displayField :'scale',
		mode :'local',
		triggerAction :'all',
		forceSelection :true,
		editable :false,
		autoWidth :true,
		autoHeight :true,
		store :store
	});

	WebGIS.ScaleList.superclass.constructor.apply(this, arguments);

	/**
	 * @private
	 */
	var onSelect = function(combo, record, index) {
		map.zoomTo(record.get('zoomlevel'));
	};
	this.on('select', onSelect);

	/**
	 * @private
	 */
	var onZoomend = function() {
		this.setValue(map.getZoomForResolution(map.getResolution()));
	};
	map.events.register('zoomend', this, onZoomend);

	for ( var i = 0; i < map.getNumZoomLevels(); i++) {
		var scale = OpenLayers.Util.getScaleFromResolution(map
				.getResolutionForZoom(i), 'm'), row = new Ext.data.Record( {
			zoomlevel :i,
			scale :'1:' + Math.round(scale)
		});

		store.add(row);
	}

	this.setValue(map.getZoomForResolution(map.getResolution()));
};

Ext.extend(WebGIS.ScaleList, Ext.form.ComboBox);

Ext.reg('webgis-scalelist', WebGIS.ScaleList);
