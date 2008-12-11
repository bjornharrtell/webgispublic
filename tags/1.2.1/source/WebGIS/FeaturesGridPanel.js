/**
 * WebGIS JS Library Copyright(c) 2008, Sweco Position
 * 
 * Licensed under GPLv3 http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 */

/**
 * An extended Grid that can communicate with a layer to view its features
 * attributes or manually update from feature array data
 * 
 * @constructor
 * @base Ext.grid.GridPanel
 * @param {Object}
 *            config
 * @param {OpenLayers.Layer.Vector}
 *            config.layer
 * @param {WebGIS.MapAction.SelectFeature}
 *            config.selectFeature
 */
WebGIS.FeaturesGridPanel = function(config) {
	var layer = config.layer;

	var fields = [];
	var columns = [];

	fields.push('feature');
	fields.push('fid');
	columns.push( {
	    id :'fid',
	    header :'id',
	    width :20,
	    dataIndex :'fid'
	});

	for ( var key in layer.features[0].attributes) {
		fields.push(key);
		columns.push( {
		    header :key,
		    width :40,
		    sortable :true,
		    dataIndex :key
		});
	}

	var store = new Ext.data.SimpleStore( {
		fields :fields
	});

	Ext.apply(this, {
	    stripRows :true,
	    viewConfig : {
		    forceFit :true
	    },
	    store :store,
	    columns :columns
	});

	WebGIS.FeaturesGridPanel.superclass.constructor.apply(this, arguments);

	var addFeatures = function(features) {
		var array = [];

		for ( var i = 0; i < features.length; i++) {
			var feature = features[i];
			var row = [];
			row.push(feature);
			row.push(feature.fid);
			for ( var name in feature.attributes) {
				var value = feature.attributes[name];
				row.push(value);
			}
			array.push(row);
		}

		store.loadData(array);
	};

	addFeatures(layer.features);

	var featureIndex;

	var zoomTo = function() {
		layer.map.zoomToExtent(layer.features[featureIndex].geometry.getBounds());
	};

	var menu = new Ext.menu.Menu();

	menu.add( {
	    text :'Zoom to',
	    handler :zoomTo
	});

	var onRowContextMenu = function(grid, rowIndex, event) {
		featureIndex = rowIndex;

		menu.showAt(event.getXY());

		event.stopEvent();
	};

	this.on('rowcontextmenu', onRowContextMenu);

	var selectionModel = this.getSelectionModel();
	var onSelectionChange = function() {
		var selections = selectionModel.getSelections();

		config.selectFeature.unselectAll();

		for ( var i = 0; i < selections.length; i++) {
			var record = selections[i];
			var feature = record.get('feature');
			config.selectFeature.select(feature);
		}
	};

	selectionModel.on('selectionchange', onSelectionChange);
};

Ext.extend(WebGIS.FeaturesGridPanel, Ext.grid.GridPanel);

Ext.reg('webgis-featuresgridpanel', WebGIS.FeaturesGridPanel);
