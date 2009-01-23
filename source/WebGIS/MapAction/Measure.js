/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Albin Lundmark
 *
 * @fileoverview Measure map tools implemented as WebGIS.MapAction classes
 */

/**
 * Activates measuring line tool on map.<br>
 * <br>
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
	config = config ? config : {};
	config.iconCls = 'webgis-mapaction-measurelength';
	config.map = config.map ? config.map : WebGIS.MapAction.map;
	
	var map = config.map;
	var layer = config.layer;
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
	 * will be called in the context of the OpenLayers.Control
	 * 
	 * @private
	 */
	var updateTip = function(point) {
		var length = this.handler.line.geometry.getLength(), pixel, el;

		if (length === 0) {
			return;
		}

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

		pixel = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(point.x, point.y));
		el = Ext.Element(map.div);
		tip.showAt( [ pixel.x + 5 + el.getLeft(), pixel.y + 5 + el.getTop() ]);
	};

	config.olcontrol = new OpenLayers.Control.DrawFeature(layer, OpenLayers.Handler.Path, {
		callbacks : {
		    done :destroyTip,
		    point :updateTip,
		    cancel :destroyTip
		}
	});

	WebGIS.MapAction.MeasureLine.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.MeasureLine, WebGIS.MapAction);

/**
 * Activates measuring area tool on map.<br>
 * <br>
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
	config = config ? config : {};
	config.iconCls = 'webgis-mapaction-measurearea';
	config.map = config.map ? config.map : WebGIS.MapAction.map;

	var map = config.map;
	var layer = config.layer;
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
	var updateTip = function(point) {
		var area = this.handler.polygon.geometry.getArea(), pixel, el;

		if (area === 0) {
			return;
		}

		area = (Math.round(area * 100 / 10000) / 100).toString() + ' ha';

		destroyTip();

		tip = new Ext.Tip( {
		    html :area,
		    style :'width:150',
		    autoHeight :true
		});

		pixel = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(point.x, point.y));
		el = Ext.Element(map.div);
		tip.showAt( [ pixel.x + 5 + el.getLeft(), pixel.y + 5 + el.getTop() ]);
	};

	config.olcontrol = new OpenLayers.Control.DrawFeature(config.layer, OpenLayers.Handler.Polygon, {
		callbacks : {
		    done :destroyTip,
		    point :updateTip,
		    cancel :destroyTip
		}
	});

	WebGIS.MapAction.MeasureArea.superclass.constructor.call(this, config);
};
Ext.extend(WebGIS.MapAction.MeasureArea, WebGIS.MapAction);
