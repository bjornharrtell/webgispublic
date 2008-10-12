/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 * 
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 *
 * Author: Björn Harrtell
 *
 * @fileoverview OpenLayers.Layer.WebGISTileServer class
 */

// need to define WebGISTileServer.Provider class since the code at serverside doesn't do it
WebGISTileServer = new Object();
WebGISTileServer.Provider = OpenLayers.Class.create();

/**
 * @class Layer that supports WebGISTileServer sources
 * @extends OpenLayers.Layer.Grid
 * @requires OpenLayers/Layer/Grid.js
 */
OpenLayers.Layer.WebGISTileServer = OpenLayers.Class(OpenLayers.Layer.Grid, {

	// overridden config options
	isBaseLayer: true,
	tileSize: new OpenLayers.Size(250, 250),
	/**
	 * @constructor
	 *
	 * @param {String} name Name of layer
	 * @param {String} url URL to WebGISTileServer service
	 * @param {WebGISTileServer.Provider} provider WebGISTileServer service 
	 * @param {String} token Valid token from WebGISTileServer
	 specific provider instance. The server exposes the providers as
	 external js files.
	 */
	initialize: function(name, url, provider, token) {
		var newArguments = new Array();
		newArguments.push(name, url, {}, provider);
		
		OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);

		this.provider = provider;
		this.token = token;
	},

	// overridden to set maxextent and tileorigin for each zoomlevel
	initGriddedTiles: function(bounds) {
		// WebGISTileServer have reverse zoom level order
		var z = this.map.resolutions.length-1-this.map.getZoom();
		this.maxExtent = new OpenLayers.Bounds(this.provider.MINX[z],this.provider.MINY[z],this.provider.MAXX[z],this.provider.MAXY[z]);		
		this.map.maxExtent = this.maxExtent;
		this.tileOrigin = new OpenLayers.LonLat(this.provider.MINX[z], this.provider.MINY[z]);
		
		OpenLayers.Layer.Grid.prototype.initGriddedTiles.apply(this, arguments);
	},
		
	getURL: function (bounds) {
		var res = this.map.getResolution();
		var z = this.map.resolutions.length-1-this.map.getZoom();
			
		var x = Math.floor((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
		var y = Math.floor((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
			
		// WebGISTileServer have reverse y tile order
		var tilemax = (this.provider.MAXY[z]-this.provider.MINY[z])/(this.provider.SIZES[z]);
		y = tilemax-1-y;

		return this.url + "?providerId=" + this.provider.providerId + "&token="+ this.token + "&zoomlevel=" + z + "&x=" + x + "&y=" + y; 
	},

	addTile: function(bounds,position) {
		return new OpenLayers.Tile.Image(this, position, bounds, null, this.tileSize);
	},

	/** @final @type String */
	CLASS_NAME: "OpenLayers.Layer.WebGISTileServer"
});
