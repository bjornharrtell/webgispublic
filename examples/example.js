Ext.namespace('Example');

Example.Application = function() {
	var map;
	var toolbar1 = new Ext.Toolbar();
	var toolbar2 = new Ext.Toolbar();

	var mapOptions = {
		maxResolution: 1.40625/2,
		controls: []
	};

	var layers = [
	    new OpenLayers.Layer.WMS(
			"Metacarta Tile Cache",
			"http://labs.metacarta.com/wms-c/Basic.py?", {
				"layers": "basic",
				"format": "image/jpeg"
			}, {
				buffer: 0
			}
		)
	];

	return {
		init: function() {

			Ext.QuickTips.init();
		
			var panel = new Ext.Panel({
				border: false,
				layout: 'fit'
			});
			
			new Ext.Viewport({
				layout: 'fit',
				items: panel
			});

			map = new OpenLayers.Map(panel.body.dom, mapOptions);
			map.addLayers(layers);
			map.zoomToMaxExtent();

			var editlayer = new OpenLayers.Layer.Vector('editlayer');
			map.addLayer(editlayer);
			
			var toolbarWindow1 = new Ext.Window({
				title: 'Basic tools',
				border: false,
				width: 450,
				autoHeight: true,
				items: toolbar1
			});
			toolbarWindow1.show();
			toolbarWindow1.setPosition(20,5);
			
			var toolbarWindow2 = new Ext.Window({
				title: 'Edit tools',
				border: false,
				width: 200,
				autoHeight: true,
				items: toolbar2
			});
			toolbarWindow2.show();
			toolbarWindow2.setPosition(480,5);

			// map action is an extended Ext.Action that can be used as a button or menu item
			toolbar1.add('-');
			toolbar1.add(new WebGIS.MapAction.DragPan({map: map}));
			toolbar1.add(new WebGIS.MapAction.ZoomInBox({map: map}));
			toolbar1.add(new WebGIS.MapAction.ZoomOutBox({map: map}));
			toolbar1.add(new WebGIS.MapAction.ZoomIn({map: map}));
			toolbar1.add(new WebGIS.MapAction.ZoomOut({map: map}));
			toolbar1.add(new WebGIS.MapAction.PreviousExtent({map: map}));
			toolbar1.add(new WebGIS.MapAction.NextExtent({map: map}));
			toolbar1.add(new WebGIS.MapAction.FullExtent({map: map}));
			toolbar1.add(new WebGIS.MapAction.MeasureLine({map: map}));
			toolbar1.add(new WebGIS.MapAction.MeasureArea({map: map}));
			toolbar1.add('-');
			toolbar1.add({xtype: 'webgis-scalelist', map: map});
			toolbar2.add('-');
			toolbar2.add(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Point'}));
			toolbar2.add(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Curve'}));
			toolbar2.add(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Polygon'}));
			toolbar2.add('-');
			toolbar2.add(new WebGIS.MapAction.SelectFeature({map: map, layer: editlayer}));
			toolbar2.add(new WebGIS.MapAction.ModifyFeature({map: map, layer: editlayer}));
			toolbar2.add(new WebGIS.MapAction.DragFeature({map: map, layer: editlayer}));
			toolbar2.add(new WebGIS.MapAction.RemoveSelectedFeatures({map: map, layer: editlayer}));

			var toc = new WebGIS.Toc({map: map, useMetadata: true, autoScroll: true});
			var window = new Ext.Window({
				title: 'Layers',
				border: false,
				layout: 'fit',
				width: 200,
				height: 100,
				items: toc
			});
			window.show();
			window.setPosition(20,70);

			toc.update();
			
			return null;
		}
	};
}();

Ext.onReady(Example.Application.init, Example.Application);
