Ext.namespace('WebGISTileServer');

WebGISTileServer.Application = function() {
    var map;
    var toolbar;
    
    var provider = new WebGISTileServer.Provider.LMVSE();

    var mapOptions = {
		resolutions: [3000/(6*250),6000/(6*250),18000/(6*250),54000/(6*250),162000/(6*250),375000/(6*250),630000/(6*250),3300000/(6*250),6900000/(6*250)],
		maxExtent: new OpenLayers.Bounds(0, 5000000, 3000000, 9000000),
	    units: "meters",
	    projection: "EPSG:2400"
	};
    
	var layer = new OpenLayers.Layer.WebGISTileServer(
		'WebGISTileServer',
		'http://www.asp-mapservices.com/WebGISTileServer/PublicServletProxy',
		provider,
		OpenLayers.Layer.WebGISTileServer.GetToken()
	);

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
            map.addLayer(layer);

            map.setCenter(new OpenLayers.LonLat(1500000, 6920000), 1);
            
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



