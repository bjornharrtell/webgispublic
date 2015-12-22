## General information ##

You need to know how AJAX and object oriented javascript works. You also need to learn [Ext JS](Ext.md) and OpenLayers API, at least at a basic level. [Ext JS](Ext.md) has a great resource on the subject general [Web 2.0 developing](http://extjs.com/learn/Manual:Resources) and also quite a few good tutorials on how to use the [Ext JS](Ext.md) framework itself.

If you do not need to make new tools or OpenLayers extensions aside from the included ones in WebGIS, I would suggest that you focus on learning basic usage of [Ext JS](Ext.md) to be able to do some GUI layouts using WebGIS controls.

A test project is included with the source that should provide a basis for new projects and further development.

Comments in code are in JSDoc format and documentation can be built with a release.

## Development environment ##

Using a good development environment is very important to be successful in javascript coding. The alternatives are much better now than some years ago and we recommend the latest version of Eclipse. A good comparison and explanation of the alternatives are at the Ext JS website [here](http://extjs.com/learn/Manual:Resources#IDEs).

The WebGIS Public project is now using Eclipse and can be checked out directly as as Web project in Eclipse using SVN integration. Note that using the WebGIS Public API does however not require Eclipse.

Using Firefox with Firebug as the main browser/debugger for development is also strongly recommended, even if developing for usage in Internet Explorer.

## Basic HTML page include example ##

Inclusion of the API in a HTML page is similar to [Ext JS](Ext.md). One CSS file and one Javascript file is referenced. Ext JS and OpenLayers should be included first. Example:

```
<link rel="stylesheet" type="text/css" href="ext-2.2/resources/css/ext-all.css" />
<script type="text/javascript" src="ext-2.2/ext-all.js"></script>

<script type="text/javascript" src="OpenLayers-2.7/OpenLayers.js"></script>

<link rel="stylesheet" type="text/css" href="webgis/resources/css/webgis.css" />
<script type="text/javascript" src="webgis/webgis.js"></script>
```