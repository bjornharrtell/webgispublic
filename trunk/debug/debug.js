Ext.namespace('Example');

Example.Application = function() {
	var map;
	var toolbar = new Ext.Toolbar();

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
				layout: 'fit',
				tbar: toolbar
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
			toolbar.add('-');
			toolbar.add({xtype: 'webgis-scalelist', map: map});
			toolbar.add('-');
			toolbar.add(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Point'}));
			toolbar.add(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Curve'}));
			toolbar.add(new WebGIS.MapAction.DrawFeature({map: map, layer: editlayer, geometryType: 'OpenLayers.Geometry.Polygon'}));
			toolbar.add('-');
			toolbar.add(new WebGIS.MapAction.SelectFeature({map: map, layer: editlayer}));
			toolbar.add(new WebGIS.MapAction.ModifyFeature({map: map, layer: editlayer}));
			toolbar.add(new WebGIS.MapAction.DragFeature({map: map, layer: editlayer}));
			toolbar.add(new WebGIS.MapAction.RemoveSelectedFeatures({map: map, layer: editlayer}));

			var toc = new WebGIS.Toc({map: map, useMetadata: true, autoScroll: true});
			var window = new Ext.Window({
				title: 'Layers',
				border: false,
				layout: 'fit',
				width: 200,
				height: 300,
				items: toc
			});
			window.show();
			window.setPosition(20,50);
			
			toc.update();
			
			var success = function(response) {
				var json = response.responseText;
				
				var format = new OpenLayers.Format.GML();
				var features = format.read(json);
				
				editlayer.addFeatures(features);
				
				var featureGridPanel = new WebGIS.FeaturesGridPanel({layer: editlayer});
				
				var window2 = new Ext.Window({
					title: 'Features',
					border: false,
					layout: 'fit',
					width: 400,
					height: 300,
					items: featureGridPanel
				});
				window2.show();
				window2.setPosition(220,50);
				
				//featureGridPanel.addFeatures(features);
				
				return true;
			};
			
			Ext.Ajax.request({
				url: 'waterbodies.gml',
				success: success
			});


			return null;
		}
	};
}();

Ext.onReady(Example.Application.init, Example.Application);
