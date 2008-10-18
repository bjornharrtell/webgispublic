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
 * @class Activates measuring line tool on map.<br>The tool presumes the map unit to be meters and presents the result in m or km depending on value. If the tool is used on a WGS84 (or other none-meter) map the resulting value will be invalid.
 * @extends WebGIS.MapAction
 * @param {Object} config WebGIS.MapAction config options<br>
 */
WebGIS.MapAction.MeasureLine = function(config) {
	var destroyTip,
		updateTip;
	
	config.iconCls = 'webgis-mapaction-measurelength';

	destroyTip = function() {
		if (this.tip) {
			this.tip.destroy();
		}
	};
	
	updateTip = function(point) {
		var length = this.handler.line.geometry.getLength(),
			pixel,
			el;

		if (length === 0) {	return;	}
	
		// is not more than 1 km
		if ((length%1000)===length) {
			length = Math.round(length).toString() + ' m';
		}
		else {
			length = ((Math.round(length*10/1000)/10)).toString() + ' km';
		}
		
		if (this.tip) { this.tip.destroy();	}
		this.tip = new Ext.Tip({html: length, style: "width:150", autoHeight:true});
		
		pixel = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(point.x,point.y));
		el = Ext.Element(this.map.div);
		this.tip.showAt([pixel.x+5+el.getLeft(),pixel.y+5+el.getTop()]);
	};
	
	config.olcontrol = new OpenLayers.Control.DrawFeature(config.layer, OpenLayers.Handler.Path, { 
		callbacks: { 
			done: destroyTip,
			point: updateTip,
			cancel: destroyTip
		}
	});
	
	WebGIS.MapAction.MeasureLine.superclass.constructor.call(this, config);
};
WebGIS.MapAction.MeasureLine.prototype = {};
Ext.extend(WebGIS.MapAction.MeasureLine, WebGIS.MapAction);

/**
 * @class Activates measuring area tool on map.<br>The tool presumes the map unit to be meters and presents the result in m2 or km2 depending on value. If the tool is used on a WGS84 map the resulting value will be invalid.
 * @extends WebGIS.MapAction
 * @param {String} config WebGIS.MapAction config options<br>
 */
WebGIS.MapAction.MeasureArea = function(config) {
	config.iconCls = 'webgis-mapaction-measurearea';
	
	var destroyTip,
		updateTip;

	destroyTip = function() {
		if (this.tip) { this.tip.destroy(); }
	};
	
	updateTip = function(point) {
		var area = this.handler.polygon.geometry.getArea(),
			pixel,
			el;

		if (area === 0) { return; }
	
		// is not more than 1 km2
		if ((area%1000000)===area) {
			area = Math.round(area).toString() + ' m&#178;';
		}
		else {
			area = (Math.round(area*10/1000000)/10).toString() + ' km&#178;';
		}
		
		if (this.tip) { this.tip.destroy();	}
		this.tip = new Ext.Tip({html: area, style: "width:150", autoHeight:true});
		
		pixel = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(point.x,point.y));
		el = Ext.Element(this.map.div);
		this.tip.showAt([pixel.x+5+el.getLeft(),pixel.y+5+el.getTop()]);
	};
	
	config.olcontrol = new OpenLayers.Control.DrawFeature(config.layer, OpenLayers.Handler.Polygon, { 
		callbacks: { 
			done: destroyTip,
			point: updateTip,
			cancel: destroyTip
		}
	});
	
	WebGIS.MapAction.MeasureArea.superclass.constructor.call(this, config);
};
WebGIS.MapAction.MeasureArea.prototype = {};
Ext.extend(WebGIS.MapAction.MeasureArea, WebGIS.MapAction);
