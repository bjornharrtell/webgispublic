/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Authors: Albin Lundmark, Björn Harrtell
 *
 * @fileoverview Measure map tools implemented as WebGIS.MapAction classes
 */

/**
 * The tool presumes the map unit to be meters and presents the result in m or
 * km depending on value. If the tool is used on a WGS84 (or other none-meter)
 * map the resulting value will be invalid.
 * 
 * @constructor
 * @extends WebGIS.MapAction
 * @param {Object}
 *            config
 */
WebGIS.MapAction.MeasureLine = function(config) {
	var control = new OpenLayers.Control.Measure(OpenLayers.Handler.Path);
	
	WebGIS.MapAction.MeasureLine.superclass.constructor.call(this, Ext.apply( {
	    iconCls :'webgis-mapaction-measurelength',
	    olcontrol: control
	}, config));

	var layer = this.layer;
	var map = this.map;
	
	var tip;

	/**
	 * @private
	 */
	var destroyTip = function() {
		if (tip) {
			tip.destroy();
		}
	};

	/**
	 * @private
	 */
	var updateTip = function(event) {
		var line = event.geometry;
		
		var length = line.getLength();
		if (length === 0) {
			return;
		}
		
		var point = line.components[line.components.length-1];

		// is not more than 10 km
		if ((length % 10000) === length) {
			length = (Math.round(length * 100) / 100).toString() + ' m';
		} else {
			length = ((Math.round(length * 100 / 1000) / 100)).toString() + ' km';
		}

		destroyTip();

		tip = new Ext.Tip( {
		    html :length,
		    style :'width:150',
		    autoHeight :true
		});

		var pixel = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(point.x, point.y));
		var el = Ext.get(map.div.id);
		tip.showAt( [ pixel.x + 5 + el.getLeft(), pixel.y + 5 + el.getTop() ]);
	};

	control.events.register('measure', null, destroyTip);
	control.events.register('measurepartial', null, updateTip);	
};
Ext.extend(WebGIS.MapAction.MeasureLine, WebGIS.MapAction);

/**
 * The tool presumes the map unit to be meters and presents the result in m2 or
 * km2 depending on value. If the tool is used on a WGS84 map the resulting
 * value will be invalid.
 * 
 * @constructor
 * @extends WebGIS.MapAction
 * @param {Object}
 *            config WebGIS.MapAction config options<br>
 */
WebGIS.MapAction.MeasureArea = function(config) {
	var control = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon);
	
	WebGIS.MapAction.MeasureArea.superclass.constructor.call(this, Ext.apply( {
	    iconCls :'webgis-mapaction-measurearea',
	    olcontrol: control
	}, config));

	var layer = this.layer;
	var map = this.map;
	
	var tip;

	/**
	 * @private
	 */
	var destroyTip = function() {
		if (tip) {
			tip.destroy();
		}
	};

	/**
	 * 
	 * @private
	 */
	var updateTip = function(event) {
		var polygon = event.geometry;
		var area = polygon.getArea();

		if (area === 0) {
			return;
		}
		
		var points = polygon.components[0].components;
		var point = points[points.length-2];

		area = (Math.round(area * 100 / 10000) / 100).toString() + ' ha';

		destroyTip();

		tip = new Ext.Tip( {
		    html :area,
		    style :'width:150',
		    autoHeight :true
		});

		var pixel = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(point.x, point.y));
		var el = Ext.get(map.div.id);
		tip.showAt( [ pixel.x + 5 + el.getLeft(), pixel.y + 5 + el.getTop() ]);
	};

	control.events.register('measure', null, destroyTip);
	control.events.register('measurepartial', null, updateTip);	
};
Ext.extend(WebGIS.MapAction.MeasureArea, WebGIS.MapAction);
