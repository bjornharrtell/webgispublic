Ext.namespace('Example');

MooPanel = function(config) {
	MooPanel.superclass.constructor.call(this, Ext.apply( {
	    border :false,
	    title :'moooo!',
	    width :250,
	    region :'west',
	    html :'moo',
	    split :true,
	    collapsible :true
	}, config));
};

Ext.extend(MooPanel, Ext.Panel);
Ext.reg('moopanel', MooPanel);

Example.Application = function() {
	var mapPanel;
	var toolbar = new Ext.Toolbar();

	var mapOptions = {
	    maxResolution :1.40625 / 2,
	    controls : []
	};

	var layers = [ new OpenLayers.Layer.WMS("Metacarta Tile Cache",
	        "http://labs.metacarta.com/wms-c/Basic.py?", {
	            "layers" :"basic",
	            "format" :"image/jpeg"
	        }, {
		        buffer :0
	        }) ];

	var onAfterMapRender = function() {
		var map = mapPanel.map;

		map.addLayers(layers);
		map.zoomToMaxExtent();

		map.addControl(new OpenLayers.Control.MousePosition());

		var editlayer = new OpenLayers.Layer.Vector('editlayer');
		map.addLayer(editlayer);

		WebGIS.MapAction.map = map;
		toolbar.add(new WebGIS.MapAction.DragPan());
		toolbar.add(new WebGIS.MapAction.ZoomInBox( {
			map :map
		}));
		toolbar.add(new WebGIS.MapAction.ZoomOutBox());
		toolbar.add(new WebGIS.MapAction.ZoomIn());
		toolbar.add(new WebGIS.MapAction.ZoomOut());
		toolbar.add(new WebGIS.MapAction.PreviousExtent());
		toolbar.add(new WebGIS.MapAction.NextExtent());
		toolbar.add(new WebGIS.MapAction.FullExtent());
		toolbar.add(new WebGIS.MapAction.MeasureLine());
		toolbar.add(new WebGIS.MapAction.MeasureArea());
		toolbar.add('-');
		toolbar.add( {
		    xtype :'webgis-scalelist',
		    map :map,
		    significantDigits :2
		});
		toolbar.add('-');
		toolbar.add(new WebGIS.MapAction.DrawFeature( {
		    layer :editlayer,
		    geometryType :'OpenLayers.Geometry.Point'
		}));
		toolbar.add(new WebGIS.MapAction.DrawFeature( {
		    layer :editlayer,
		    geometryType :'OpenLayers.Geometry.Curve'
		}));
		toolbar.add(new WebGIS.MapAction.DrawFeature( {
		    layer :editlayer,
		    geometryType :'OpenLayers.Geometry.Polygon'
		}));
		toolbar.add('-');
		var selectFeature = new WebGIS.MapAction.SelectFeature( {
			layer :editlayer
		});
		toolbar.add(selectFeature);
		// toolbar.add(new WebGIS.MapAction.ModifyFeature({map: map, layer:
		// editlayer}));
		toolbar.add(new WebGIS.MapAction.DragFeature( {
			layer :editlayer
		}));
		toolbar.add(new WebGIS.MapAction.RemoveSelectedFeatures( {
			layer :editlayer
		}));

		var toc = new WebGIS.Toc( {
			map: map,
		    useMetadata :true,
		    autoScroll :true
		});
		var window = new Ext.Window( {
		    title :'Layers',
		    border :false,
		    layout :'fit',
		    width :200,
		    height :300,
		    items :toc
		});
		window.show();
		window.setPosition(20, 50);

		toc.update();

		var success = function(response) {
			var json = response.responseText;

			var format = new OpenLayers.Format.GML();
			var features = format.read(json);

			editlayer.addFeatures(features);

			var featureGridPanel = new WebGIS.FeaturesGridPanel( {
			    layer :editlayer,
			    selectFeature :selectFeature
			});

			var window2 = new Ext.Window( {
			    title :'Features',
			    border :false,
			    layout :'fit',
			    width :400,
			    height :300,
			    items :featureGridPanel
			});
			window2.show();
			window2.setPosition(220, 50);

			return true;
		};

		Ext.Ajax.request( {
		    url :'waterbodies.gml',
		    success :success
		});
	}

	return {
		init : function() {
			Ext.QuickTips.init();

			mapPanel = new WebGIS.MapPanel( {
			    border :false,
			    layout :'fit',
			    tbar :toolbar,
			    region :'center',
			    mapOptions :mapOptions
			});

			mapPanel.on('afterMapRender', onAfterMapRender);

			new Ext.Viewport( {
			    layout :'border',
			    items : [ mapPanel ]
			});

			return null;
		}
	};
}();

Ext.onReady(Example.Application.init, Example.Application);
