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
 * @constructor
 * @base Ext.form.ComboBox
 * @param {Object} config
 * @cfg {OpenLayers.Map} map required
 */
WebGIS.ScaleList = function(config) {
	Ext.apply(this, { 
		valueField: 'zoomlevel',
		displayField: 'scale',
		mode: 'local',
		triggerAction: 'all',
		forceSelection: true,
		editable: false,
		autoWidth: true,
		autoHeight: true,
		store: new Ext.data.SimpleStore({
			fields: ['res', 'scale']
		})
	});
	
	WebGIS.ScaleList.superclass.constructor.call(this, config);

	this.on('select', function(combo, record, index) {
		this.map.zoomTo(record.get('zoomlevel'));
	});
	
	this.map.events.register('zoomend', this, function() {
		this.setValue(this.map.getZoomForResolution(this.map.getResolution()));
	});
		
	for (var i=0; i<this.map.getNumZoomLevels(); i++) {
		var scale = OpenLayers.Util.getScaleFromResolution(this.map.getResolutionForZoom(i), 'm'),
			row = new Ext.data.Record({zoomlevel: i, scale: '1:' + Math.round(scale)});

		this.store.add(row);
	}
	
	this.setValue(this.map.getZoomForResolution(this.map.getResolution()));
};

Ext.extend(WebGIS.ScaleList, Ext.form.ComboBox);

Ext.reg('webgis-scalelist', WebGIS.ScaleList);
