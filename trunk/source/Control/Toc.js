/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview WebGIS.Control.Toc class
 */

Ext.namespace('WebGIS', 'WebGIS.Control');

/**
 * @class A TOC generated from layers in an OpenLayers.Map.
 * All nodes are extended with a property "layer" referencing OL.Layer
 * All nodes are also extended with a property "metadata" that is used to view dynamic metadata on context menu clicks
 * Childnodes on parsed WMS layers have added property "name" that is the short layer name in the WMS service
 * WMS layers that has a valid capabilitiesUrl property will be parsed and expanded with subnodes representing the layers
 * 
 * @extends Ext.tree.TreePanel
 * @param {Object} config Ext.tree.TreePanel config options:<br>
 * {WebGIS.Map} [map] Required config option<br>
 * {useMetadata} [boolean] Set to true to enable parsing of metadata and context menu
 */
WebGIS.Control.Toc = function() {}; 

/**
 * updates the Toc from current associated map layer contents
 */
WebGIS.Control.Toc.prototype.update = function() {};

// actual code
WebGIS.Control.Toc = Ext.extend(Ext.tree.TreePanel, {
	
	// default config options
	rootVisible: false,
	useMetadata: false,
	root: new Ext.tree.TreeNode({draggable:false}),
	
	// constructor
	initComponent: function() {
		WebGIS.Control.Toc.superclass.initComponent.call(this);
	},
	
	// recursive function to fill an Ext.tree.TreeNode with WMS layer information in XML document array form
	// node is an Ext.tree.TreeNode
	// layerinfos is a XML document array with WMS <Layer> tags to parse
	// onContextmenu is a function that handles contextmenu events on the nodes
	fillTree: function(node, layerinfos, layer, root) {

		for (var i = 0; i<layerinfos.length; i++)
		{
			var layerinfo = layerinfos[i];
			
			var name = Ext.DomQuery.selectNode('Name', layerinfo).textContent;
			var title = Ext.DomQuery.selectNode('Title', layerinfo).textContent;
			
			var checked = false;
			
			if (layer.params.LAYERS.indexOf(name) != -1) checked = true;
			
			if (root == null) root = node;
			var childNode = new Ext.tree.TreeNode({
				text: title,
				checked: checked
			})
			childNode.name = name;
			childNode.layer = layer;
			childNode.layerIndex = i;

			if (this.useMetadata) {
				// parse metadata
				childNode.metadata = {};
				childNode.metadata.wms = {};
				childNode.metadata.wms.layer = {};
				childNode.metadata.wms.layer.name = name;
				childNode.metadata.wms.layer.title = title;
				childNode.metadata.wms.layer.srs = Ext.DomQuery.selectNode('SRS', layerinfo).textContent;
			
				childNode.on("contextmenu", this.onContextmenu, this);
			}
			
			childNode.on("checkchange", this.onWmsSubLayerCheckChange, root);
			
			node.appendChild(childNode);
			root.subLayers.push({name: name, visibility: checked});
			
			// recurse layers child layers
			this.fillTree(node, Ext.DomQuery.select('Layer', layerinfo), layer, root);
		}
	},
	
	// generic contextmenu handler
	onContextmenu: function(node, event) {
		
		var showProperties = function(baseitem, event) {
			var layer = baseitem.node;
			var metadata = baseitem.node.metadata;

			var html = "";

			if (metadata) {
				if (metadata.openlayers) {
					html += '<h3 class="webgis-metadatalist">' + 'OpenLayers' + '</h3>';
					html += '<dl class="webgis-metadatalist">'
					html += '<dt>' + 'Type' + '</dt>';
					html += '<dd>' + metadata.openlayers.type + '</dd>';
					html += '<dt>' + 'Source' + '</dt>';
					html += '<dd>' + metadata.openlayers.source + '</dd>';
					html += '</dl><br>'
				}
				
				if (metadata.wms) {
					if (metadata.wms.service) {
						html += '<h3>' + 'WMS Service' + '</h3>';
						html += '<dl>'
						html += '<dt>' + 'Name' + '</dt>';
						html += '<dd>' + metadata.wms.service.name + '</dd>';
						html += '<dt>' + 'Title' + '</dt>';
						html += '<dd>' + metadata.wms.service.title + '</dd>';
						html += '<dt>' + 'Abstract' + '</dt>';
						html += '<dd>' + metadata.wms.service.abstact + '</dd>';
						html += '</dl><br>'
					}
					
					if (metadata.wms.layer) {
						html += '<h3>' + 'WMS Layer' + '</h3>';
						html += '<dl>'
						html += '<dt>' + 'Name' + '</dt>';
						html += '<dd>' + metadata.wms.layer.name + '</dd>';
						html += '<dt>' + 'Title' + '</dt>';
						html += '<dd>' + metadata.wms.layer.title + '</dd>';
						html += '<dt>' + 'SRS' + '</dt>';
						html += '<dd>' + metadata.wms.layer.srs + '</dd>';
						html += '</dl><br>'
					}
				}
			}
		
			var window = new Ext.Window({
				title: this.windowTitleMetadataText,
				border: false,
				width: 400,
				autoHeight: true,
				resizable: false,
				layout: 'fit',
				items: [{
					cls: 'webgis-metadatalist',
					border: false,
					bodyStyle: 'padding:5px',
					autoWidth: true,
					autoHeight: true,
					html: html
				}]
			});
			
			window.show();
		};

		var menu = new Ext.menu.Menu();
		
		menu.add({
			text: this.contextMenuMetadataText,
			handler: showProperties,
			node: node
		});
		
		menu.showAt(event.getXY());
	},
	
	// standard handler for OL.Layer visibility
	onLayerCheckChange: function(node, checked) {
		this.setVisibility(checked);
	},
	
	// special handler for WMS sublayers visibility
	// creates new params for WMS layer and refreshes it
	onWmsSubLayerCheckChange: function(node, checked) {
		var layers = "";
		
		this.subLayers[node.layerIndex].visibility = checked;
		
		for (var i = 0; i<this.subLayers.length; i++) {			
			if (this.subLayers[i].visibility) layers = this.subLayers[i].name + "," + layers;
		}
		
		if (layers == "") {
			this.layer.setVisibility(false);
		}
		else {
			layers = layers.slice(0, -1);
			this.layer.params.LAYERS = layers;
			this.layer.setVisibility(true);
			this.layer.redraw();
		}
		
	},

	// updates the Toc from current associated map layer contents
	// attaches event handling for visibility checkboxes
	update: function() {
		// loop all layers in map and add them to tree as separate nodes on the root
		for (var i=0; i<this.map.layers.length; i++) {
			var layer = this.map.layers[this.map.layers.length-1-i];
			
			if (layer.visibleInToc === false) {
				continue;
			}
			
			var node = new Ext.tree.TreeNode({
				text: layer.name,
				checked: layer.getVisibility()
			});
			node.layer = layer;
	
			// parse metadata
			node.metadata = {};
			node.metadata.openlayers = {};
			node.metadata.openlayers.type = layer.CLASS_NAME;
			node.metadata.openlayers.source = layer.url;
			
			node.on("contextmenu", this.onContextmenu, this);
			node.on("checkchange", this.onLayerCheckChange, layer);
			this.getRootNode().appendChild(node);
 
			if (layer.CLASS_NAME=="OpenLayers.Layer.WMS") {
				if (layer.capabilitiesUrl) {
					node.subLayers = [];
					this.parseWMSCapabilities(layer, node);
				}
			}
		}
	},
	
	parseWMSCapabilities: function(layer, node) {	 
		
		// callback function on successful request for GetCapabilities XML
		var success = function(response, options) {	
			var wmslayer = Ext.DomQuery.selectNode('Layer:first', response.responseXML);
			var wmsservice = Ext.DomQuery.selectNode('Service:first', response.responseXML);
			
			// parse name and title for top layer (the WMS service) and set the title as the text on the node
			options.node.name = Ext.DomQuery.selectNode('Name', wmslayer).textContent;
			options.node.setText(Ext.DomQuery.selectNode('Title', wmslayer).textContent);
			 
			// parse metadata
			options.node.metadata.wms = {};
			options.node.metadata.wms.service = {};
			options.node.metadata.wms.service.name = Ext.DomQuery.selectNode('Name', wmsservice).textContent
			options.node.metadata.wms.service.title = Ext.DomQuery.selectNode('Title', wmsservice).textContent
			options.node.metadata.wms.service.abstract = Ext.DomQuery.selectNode('Abstract', wmsservice).textContent
			
			// get XML nodes for layers under the top layer
			var wmssublayers = Ext.DomQuery.select('Layer', wmslayer);
			
			this.fillTree(options.node, wmssublayers, options.layer, null);
		};

		// callback function on failed request for GetCapabilities XML
		var error = function(response, options) {
			Ext.MessageBox.show({
				title: 'Error',
				msg: 'Could not get WMS GetCapabilities',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
		}

		Ext.Ajax.request({
			url: layer.capabilitiesUrl + '?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.1.1',
			scope: this,
			layer: layer,
			node: node,
			success: success,
			failure: error
		});

	}
});
