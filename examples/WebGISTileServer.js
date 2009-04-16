Ext.namespace('WebGISTileServer');

WebGISTileServer.Application = function() {
    var map;
    var toolbar;
    
    var provider = new WebGISTileServer.Provider.LMVSESweref99();

    var mapOptions = {
		resolutions: provider.map_options.resolutions,
		maxExtent: new OpenLayers.Bounds(0, 4000000, 3000000, 9000000),
	    units: "meters",
	    projection: "EPSG:3006",
	    controls: []
	};

    return {
        init: function() {
            toolbar = new Ext.Toolbar();
            var panel = new Ext.Panel({
                border: false,
                layout: 'fit',
                tbar: toolbar
            });
            
            new Ext.Viewport({
                layout:'fit',
                items: [panel]
            });
            
            map = new OpenLayers.Map(panel.body.dom, mapOptions);
            
        	var layer = new WebGIS.OpenLayers.Layer.WebGISTileServer(
    			'WebGISTileServer',
    			'http://www.asp-mapservices.com/WebGISTileServer/PublicServletProxy',
    			provider,
    			token
    		);
            map.addLayer(layer);

            map.setCenter(new OpenLayers.LonLat(150000, 6700000), 1);
            
            map.addControl(new OpenLayers.Control.MousePosition());

            toolbar.add(new WebGIS.MapAction.DragPan({map: map}));
            toolbar.add(new WebGIS.MapAction.ZoomInBox({map: map}));
            toolbar.add(new WebGIS.MapAction.ZoomOutBox({map: map}));
            toolbar.add(new WebGIS.MapAction.ZoomIn({map: map}));
            toolbar.add(new WebGIS.MapAction.ZoomOut({map: map}));
            toolbar.add(new WebGIS.MapAction.PreviousExtent({map: map}));
            toolbar.add(new WebGIS.MapAction.NextExtent({map: map}));
            toolbar.add(new WebGIS.MapAction.FullExtent({map: map}));

            return null;
        }
    };
}();

Ext.onReady(WebGISTileServer.Application.init, WebGISTileServer.Application);



