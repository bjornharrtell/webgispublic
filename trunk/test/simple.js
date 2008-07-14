// WebGIS Simple test application

Ext.namespace('Simple');

Simple.Application = function() 
{
    var map;
    var toolbar;

    // run by WebGIS.Control.Map in application init, when configuration has loaded
    var initMapUI = function() {
		
        map.zoomToMaxExtent();
		
        var toc = new WebGIS.Control.Toc({map: map, parseWMS: false, autoScroll: true});
		
        // standard Open Layers
        map.addControl(new OpenLayers.Control.MousePosition());
        map.addControl(new OpenLayers.Control.MouseDefaults()); 
        map.addControl(new OpenLayers.Control.KeyboardDefaults());
        map.addControl(new OpenLayers.Control.LayerSwitcher());
		
        // map action is an extended Ext.Action that can be used as a button or menu item
        toolbar.add(new WebGIS.MapAction.DragPan({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomInBox({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomOutBox({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomIn({map: map}));
        toolbar.add(new WebGIS.MapAction.ZoomOut({map: map}));
        toolbar.add(new WebGIS.MapAction.PreviousExtent({map: map}));
        toolbar.add(new WebGIS.MapAction.NextExtent({map: map}));
        toolbar.add(new WebGIS.MapAction.FullExtent({map: map}));
		
        var edittoolbar = new Ext.Toolbar();
        var editwindow = new Ext.Window({
            title: 'Edit tools',
            border: false,
            layout: 'fit',
            width: 200,
            autoHeight: true,
            tbar: edittoolbar
        })
        editwindow.show();
        editwindow.setPosition(250,50);
		
        var editlayer = new OpenLayers.Layer.Vector('editlayer');
        map.addLayer(editlayer);
		
        var edittools = [];
        edittools.push(new Ext.Button(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Point'})));
        edittools.push(new Ext.Button(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Curve'})));
        edittools.push(new Ext.Button(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Polygon'})));
        edittools.push(new Ext.Button(new WebGIS.MapAction.ModifyFeature({map: map, layer: editlayer})));
        edittools.push(new Ext.Button(new WebGIS.MapAction.DragFeature({map: map, layer: editlayer})));
        edittools.push(new Ext.Button(new WebGIS.MapAction.SelectFeature({map: map, layer: editlayer})));		
		
        // remove text and set css to display the buttons as icons only
        for (var i=0; i<edittools.length; i++) {
            edittools[i].removeClass('x-btn-text-icon');
            edittools[i].addClass('x-btn-icon');
            edittools[i].setText();
            edittoolbar.add(edittools[i]);
        }
		
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
	
        var scalewindow = new Ext.Window({
            title: 'Scales',
            border: false,
            layout: 'form',
            hideLabels: true,
            width: 200,
            height: 50,
            items: {xtype: 'webgis-scalelist', map: map}
        })
        scalewindow.show();
        scalewindow.setPosition(250,150);
	
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
            map = new WebGIS.Control.Map(panel.body.dom, "simple.json", initMapUI);
        }
    };
}();

// Run the application when browser is ready
Ext.onReady(Simple.Application.init, Simple.Application);