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

/**
 * @class Scalelist implemented as an Ext JS combobox extension
 * @extends Ext.form.ComboBox
 * @param {Object} config Ext.form.ComboBox config options<br>
 * {OpenLayers.Map} [map] Required config option
 */
WebGIS.ScaleList = Ext.extend(Ext.form.ComboBox, {
	valueField: 'zoomlevel',
	displayField: 'scale',
	mode: 'local',
	triggerAction: 'all',
	forceSelection: true,
	editable: false,
	autoWidth: true,
	autoHeight: true,
	initialized: false,
	initComponent: function() {
		// create default store
		this.store = new Ext.data.SimpleStore({
			fields: ['res', 'scale']
		});
		
		WebGIS.ScaleList.superclass.initComponent.call(this);
		
		if (this.intialized) {
			return;
		}
		
		this.update();
		
		// attach eventhandler for scale selection
		this.on('select', function(combo, record, index) {
			this.map.zoomTo(record.get('zoomlevel'));
		});
		
		// attach eventhandler for when map zoomlevel is changed
		this.map.events.register('zoomend', this, function() {
			this.setValue(this.map.getZoomForResolution(this.map.getResolution()));
		});
		
		this.intialized = true;
	},
	
	update: function() {
		var i, scale, row;
		
		// load available scales from map
		for (i=0; i<this.map.getNumZoomLevels(); i++) {
			scale = OpenLayers.Util.getScaleFromResolution(this.map.getResolutionForZoom(i), 'm'),
			row = new Ext.data.Record({zoomlevel: i, scale: '1:' + Math.round(scale)});

			this.store.add(row);
		}
		
		// set initial value
		this.setValue(this.map.getZoomForResolution(this.map.getResolution()));
	}

});

Ext.reg('webgis-scalelist', WebGIS.ScaleList);
