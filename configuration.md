**NOTE: Configuration files are obsolete and is removed in current trunk version, instead normal OpenLayers.Map is used and configuration is declared in javascript.**

WebGIS.Map uses a [JSON](http://www.json.org)-based configuration format. The structure is a JSON-object with two properties, "map" and "layers".

The "map" property configures OpenLayers.Map, and has two properties. The first one is "options" which correspond to the OpenLayers.Map.Properties that are integers or strings. OpenLayers.Map.Properties that are objects of other types, like OpenLayers.Bounds cannot be handled here. That is why a seconds property called "maxExtent" exists which take an rectangle array that is internally converted to an OpenLayers.Bounds.

The "layers" property is an array that can contain a number of predefined configurations for OpenLayers.Layer objects. Only a select types of layers are supported at the moment, namely WMS, TMS and WebGISTileServer layers.


Here is an example:
```
{
	"map": {
		"options": {
				"maxResolution": 1.40625/2
			},
		"maxExtent": [-180, -90, 180, 90]
	},
	"layers": [{
		"type": "WMS",
		"title": "Metacarta Tile Cache",
		"url": "http://labs.metacarta.com/wms-c/Basic.py?",
		"capabilitiesUrl": "http://labs.metacarta.com/wms-c/Basic.py?",
		"params": { 
			"layers": "basic",
			"format": "image/jpeg"
		},
		"options": { 
			"buffer": 0
		}
	}]
}
```