// WebGIS Public Example application

Ext.namespace('Example');

Example.Application = function() {
	var map;
	var toolbar;

	var mapOptions = {
		maxResolution: 1.40625/2
	};

	var layers = [new OpenLayers.Layer.WMS("Metacarta Tile Cache",
		"http://labs.metacarta.com/wms-c/Basic.py?", {
			"layers": "basic",
			"format": "image/jpeg"
		}, {
			buffer: 0
		})
	];

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
				layout: 'fit',
				items: [panel]
			});

			map = new OpenLayers.Map(panel.body.dom, mapOptions);
			map.addLayers(layers);
			map.zoomToMaxExtent();

			var toc = new WebGIS.Control.Toc({map: map, autoScroll: true});

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
	};
}();

// Run the application when browser is ready
Ext.onReady(Example.Application.init, Example.Application);
