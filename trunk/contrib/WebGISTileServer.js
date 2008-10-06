// WebGIS Simple test application

Ext.namespace('WebGISTileServer');

WebGISTileServer.Application = function() 
{
    var map;
    var toolbar;

    // run by WebGIS.Control.Map in application init, when configuration has loaded
    var initMapUI = function() {

        map.zoomToMaxExtent();

        //var provider = new WebGISTileServer.Provider.LMVSE();
        //map.setCenter(new OpenLayers.LonLat(provider.defaultLongitude, provider.defaultLatitude), 1);

        var toc = new WebGIS.Control.Toc({map: map, parseWMS: false, autoScroll: true});

        // standard Open Layers
        map.addControl(new OpenLayers.Control.MousePosition());
        map.addControl(new OpenLayers.Control.MouseDefaults()); 
        map.addControl(new OpenLayers.Control.KeyboardDefaults());

        // map action is an extended Ext.Action that can be used as a button or menu item
        toolbar.add(new WebGIS.MapAction.DragPan({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomInBox({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomOutBox({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomIn({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomOut({map: map}));
        toolbar.add(new WebGIS.MapAction.PreviousExtent({map: map}));
        toolbar.add(new WebGIS.MapAction.NextExtent({map: map}));
        toolbar.add(new WebGIS.MapAction.FullExtent({map: map}));
        toolbar.add(new WebGIS.MapAction.MeasureLine({map: map}));
        toolbar.add(new WebGIS.MapAction.MeasureArea({map: map}));
        toolbar.add(new WebGIS.MapAction.Identify({map: map, toc: toc}));

        var window = new Ext.Window({
            title: 'Layers',
            border: false,
            layout: 'fit',
            width: 200,
            height: 300,
            items: toc
        })
        window.show();
        window.setPosition(20,50);

        toc.update();
    }

    return {
        init: function() 
        {
            // Ext Js layout to fill browser with a top toolbar
            toolbar = new Ext.Toolbar();
            var panel = new Ext.Panel({
                border: false,
                layout: 'fit',
                tbar: toolbar
            });
            var viewport = new Ext.Viewport({
                layout:'fit',
                items: [panel]
            });

            // WebGIS.Control.Map is an extended OL.Map that can initialize from a predefined config
            map = new WebGIS.Control.Map(panel.body.dom, "WebGISTileServer.json", initMapUI);
        }
    };
}();

// Run the application when browser is ready
Ext.onReady(WebGISTileServer.Application.init, WebGISTileServer.Application);



