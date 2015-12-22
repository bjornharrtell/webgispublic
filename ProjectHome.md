## WebGIS Public API ##

The aim of this project is to unify OpenLayers and [Ext JS](Ext.md), which are state of the art javascript mapping and UI APIs. The result is a set of controls/actions that can be used to more rapidly build a more or less complete GIS web based client.

WebGIS Public originated at [SWECO Position AB](http://www.swecogroup.com/Web/Core/Pages/StartPage.aspx?id=122&epslanguage=en) as an internal project and the main developer is myself with contributions from Albin Lundmark. In May 2008 the SWECO Position AB decided to release the work as open source under the GPLv3 licence. If you need to use WebGIS Public in a closed-source project, contact us for other licensing options.

Functionality/classes are built on [Ext JS](Ext.md) and OpenLayers classes by extending them using object oriented javascript.

Here is an [example](http://www.wololo.org/webgispublic/example.html) how it might look.

You can read more about the WebGIS Public API [classes](classes.md) and how to start [developing](developing.md). API documentation is available [here](http://www.wololo.org/webgispublic/build/jsdocs).

If you are interested in the source code and contributing to the project, [here](eclipse.md) is is some information about using the Eclipse project and building the library.

### Release version ###

Current release version is 1.2.4 which can be downloaded [here](http://webgispublic.googlecode.com/files/webgis-1.2.4.zip).

Note that 1.2.2 has some changes that breaks the API from 1.1.0. From now on the intention is to keep the API unchanged until next major version.

Some major changes from 1.1.0 are:
  * Configuration file is no longer used (use plain javascript to configure)
  * Map class is removed (use vanilla OpenLayers.Map instead)
  * Layer order for sublayers in WMS was bottom to top, it's changed to top to bottom
  * Measure tools correctly positions display typ in relative layouts
  * ScaleList only supported one instance, fixed
  * Control namespace is removed, classed are moved to WebGIS

_/Björn Harrtell_