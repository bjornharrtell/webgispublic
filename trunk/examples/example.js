Example = {
	/**
	 * @member Example
	 */
	version : '1.0.0'
};

/**
 * @constructor
 */
Example.Application = function() {
	var map;
	var toolbar1 = new Ext.Toolbar();
	var toolbar2 = new Ext.Toolbar();

	var mapOptions = {
	    maxResolution : 1.40625 / 2,
	    controls : []
	};

	var layers = [ new OpenLayers.Layer.WMS("Metacarta Tile Cache",
	        "http://labs.metacarta.com/wms-c/Basic.py?", {
	            "layers" : "basic",
	            "format" : "image/jpeg"
	        }, {
		        buffer : 0
	        }) ];

	var init = function() {
		Ext.QuickTips.init();

		var panel = new Ext.Panel( {
		    border : false,
		    layout : 'fit'
		});

		new Ext.Viewport( {
		    layout : 'fit',
		    items : panel
		});

		map = new OpenLayers.Map(panel.body.dom, mapOptions);
		map.addLayers(layers);
		map.zoomToMaxExtent();

		var editlayer = new OpenLayers.Layer.Vector('editlayer');
		map.addLayer(editlayer);

		var toolbarWindow1 = new Ext.Window( {
		    title : 'Basic tools',
		    border : false,
		    width : 450,
		    autoHeight : true,
		    items : toolbar1
		});
		toolbarWindow1.show();
		toolbarWindow1.setPosition(20, 5);

		var toolbarWindow2 = new Ext.Window( {
		    title : 'Edit tools',
		    border : false,
		    width : 200,
		    autoHeight : true,
		    items : toolbar2
		});
		toolbarWindow2.show();
		toolbarWindow2.setPosition(480, 5);

		WebGIS.MapAction.map = map;

		// map action is an extended Ext.Action that can be used as a button
		// or menu item
		toolbar1.add('-');
		toolbar1.add(new WebGIS.MapAction.DragPan());
		toolbar1.add(new WebGIS.MapAction.ZoomInBox());
		toolbar1.add(new WebGIS.MapAction.ZoomOutBox());
		toolbar1.add(new WebGIS.MapAction.ZoomIn());
		toolbar1.add(new WebGIS.MapAction.ZoomOut());
		toolbar1.add(new WebGIS.MapAction.PreviousExtent());
		toolbar1.add(new WebGIS.MapAction.NextExtent());
		toolbar1.add(new WebGIS.MapAction.FullExtent());
		toolbar1.add(new WebGIS.MapAction.MeasureLine());
		toolbar1.add(new WebGIS.MapAction.MeasureArea());
		toolbar1.add('-');
		toolbar1.add( {
		    xtype : 'webgis-scalelist',
		    map : map
		});
		toolbar2.add('-');
		toolbar2.add(new WebGIS.MapAction.DrawFeature( {
		    layer : editlayer,
		    geometryType : 'OpenLayers.Geometry.Point'
		}));
		toolbar2.add(new WebGIS.MapAction.DrawFeature( {
		    layer : editlayer,
		    geometryType : 'OpenLayers.Geometry.Curve'
		}));
		toolbar2.add(new WebGIS.MapAction.DrawFeature( {
		    layer : editlayer,
		    geometryType : 'OpenLayers.Geometry.Polygon'
		}));
		toolbar2.add('-');
		toolbar2.add(new WebGIS.MapAction.SelectFeature( {
			layer : editlayer
		}));
		toolbar2.add(new WebGIS.MapAction.ModifyFeature( {
			layer : editlayer
		}));
		toolbar2.add(new WebGIS.MapAction.DragFeature( {
			layer : editlayer
		}));
		toolbar2.add(new WebGIS.MapAction.RemoveSelectedFeatures( {
			layer : editlayer
		}));

		var toc = new WebGIS.Toc( {
		    map : map,
		    useMetadata : true,
		    autoScroll : true
		});
		var window = new Ext.Window( {
		    title : 'Layers',
		    border : false,
		    layout : 'fit',
		    width : 200,
		    height : 100,
		    items : toc
		});
		window.show();
		window.setPosition(20, 70);

		toc.update();

	};

	this.init = init;
};

( function() {
	var instance = new Example.Application();

	Ext.onReady(instance.init, instance);
})();
