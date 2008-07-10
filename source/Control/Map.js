/**
 * WebGIS JS Library
 * Copyright(c) 2007, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview WebGIS.Control.Map class
 */

Ext.namespace('WebGIS', 'WebGIS.Control');

/**
 * @class Extends OpenLayers.Map with config functionality
 * @extends OpenLayers.Map
 * @param {String/DOM.Element} div DOM element or element id to later render OpenLayers.Map into
 * @param {String} config URL/path to configfile to read
 * @param {String} handler Function to be called when map has been initialized
 */
WebGIS.Control.Map = function(div, config, handler) {
    /**
     * Parses map config
     * @private
     */
    var parseMapConfig = function(config) {
        var options;

        var options = config.map.options;

        options.maxExtent = new OpenLayers.Bounds.fromArray(config.map.bounds);
        options.fallThrough = true;
        options.controls = [];

        return options;
    }

    /**
     * Parses layers config
     * @private
     */
    var parseLayersConfig = function(config) {
        var layers = [];

        for (var i = 0; i<config.layers.length; i++)
        {
            if (config.layers[i].type == 'WMS') {		
                var layer = new OpenLayers.Layer.WMS(config.layers[i].title, config.layers[i].url, config.layers[i].params, config.layers[i].options);

                layer.capabilitiesUrl = config.layers[i].capabilitiesUrl;

                layers.push(layer);
            }

            if (config.layers[i].type == 'TMS') {
                var layer = new OpenLayers.Layer.TMS(config.layers[i].title, config.layers[i].url, config.layers[i].options);

                layers.push(layer);
            }

            if (config.layers[i].type == 'WebGISTileServer') {
                var layer = new OpenLayers.Layer.WebGISTileServer('Xepto', 'http://cooper.xepto.com/WebGISTileServer/PublicServletProxy', config.layers[i].providerName);

                if (layer != null) {
                    layers.push(layer);
                }
            }
        }

        return layers;
    }

    // do ajax request for config file
    // if sucessful initalize ol with config
    // if it fails, display error dialog
    Ext.Ajax.request({
        url: config,
        scope: this,
        success: function(response, options) {
            var json = response.responseText;
            var config = Ext.util.JSON.decode(json);

            WebGIS.Control.Map.superclass.constructor.call(this, div, parseMapConfig(config));

            this.addLayers(parseLayersConfig(config));

            handler();
        },
        failure: function(response, options) {
            Ext.MessageBox.show({
                title: WebGIS.Locale.errorText,
                msg: this.configErrorText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });

};

Ext.extend(WebGIS.Control.Map, OpenLayers.Map, {

});
