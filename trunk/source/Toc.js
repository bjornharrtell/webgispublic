/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 */

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
WebGIS.Toc = Ext.extend(Ext.tree.TreePanel, {
	rootVisible: false,
	useMetadata: false,
	root: new Ext.tree.TreeNode({draggable:false}),

	initComponent: function() {
		WebGIS.Toc.superclass.initComponent.call(this);
	},
	
	// recursive function to fill an Ext.tree.TreeNode with WMS layer information in XML document array form
	// node is an Ext.tree.TreeNode
	// layerinfos is a XML document array with WMS <Layer> tags to parse
	// onContextmenu is a function that handles contextmenu events on the nodes
	fillTree: function(node, layerinfos, layer, root) {
		var i, layerinfo, name, title, checked, childNode, metadata;

		for (i=0; i<layerinfos.length; i++) {
			layerinfo = layerinfos[i];
			name = Ext.DomQuery.selectNode('Name', layerinfo).firstChild.nodeValue;
			title = Ext.DomQuery.selectNode('Title', layerinfo).firstChild.nodeValue;
			checked = false;
			
			if (layer.params.LAYERS.indexOf(name) !== -1) {
				checked = true;
			}
			
			if (root === null) {
				root = node;
			}
			childNode = new Ext.tree.TreeNode({
				text: title,
				checked: checked
			});
			childNode.name = name;
			childNode.layer = layer;
			childNode.layerIndex = i;

			if (this.useMetadata) {
				childNode.metadata = {};
				metadata = childNode.metadata;
				metadata.wms = {};
				metadata.wms.layer = {};
				metadata.wms.layer.name = name;
				metadata.wms.layer.title = title;
				metadata.wms.layer.srs = Ext.DomQuery.selectNode('SRS', layerinfo).firstChild.nodeValue;
			
				childNode.on("contextmenu", this.onContextmenu, this);
			}
			
			childNode.on("checkchange", this.onWmsSubLayerCheckChange, root);
			
			node.appendChild(childNode);
			root.subLayers.push({name: name, visibility: checked});
			
			// recurse layers child layers
			this.fillTree(node, Ext.DomQuery.select('Layer', layerinfo), layer, root);
		}
	},

	onContextmenu: function(node, event) {
		var showProperties, window, menu;

		showProperties = function(baseitem, event) {
			var metadata = baseitem.node.metadata,
				html = "";

			if (metadata) {
				if (metadata.openlayers) {
					html += '<h3 class="webgis-metadatalist">' + 'OpenLayers' + '</h3>';
					html += '<dl class="webgis-metadatalist">';
					html += '<dt>' + 'Type' + '</dt>';
					html += '<dd>' + metadata.openlayers.type + '</dd>';
					html += '<dt>' + 'Source' + '</dt>';
					html += '<dd>' + metadata.openlayers.source + '</dd>';
					html += '</dl><br>';
				}
				
				if (metadata.wms) {
					if (metadata.wms.service) {
						html += '<h3>' + 'WMS Service' + '</h3>';
						html += '<dl>';
						html += '<dt>' + 'Name' + '</dt>';
						html += '<dd>' + metadata.wms.service.name + '</dd>';
						html += '<dt>' + 'Title' + '</dt>';
						html += '<dd>' + metadata.wms.service.title + '</dd>';
						html += '<dt>' + 'Abstract' + '</dt>';
						html += '<dd>' + metadata.wms.service.abstacttext + '</dd>';
						html += '</dl><br>';
					}
					
					if (metadata.wms.layer) {
						html += '<h3>' + 'WMS Layer' + '</h3>';
						html += '<dl>';
						html += '<dt>' + 'Name' + '</dt>';
						html += '<dd>' + metadata.wms.layer.name + '</dd>';
						html += '<dt>' + 'Title' + '</dt>';
						html += '<dd>' + metadata.wms.layer.title + '</dd>';
						html += '<dt>' + 'SRS' + '</dt>';
						html += '<dd>' + metadata.wms.layer.srs + '</dd>';
						html += '</dl><br>';
					}
				}
			}
		
			window = new Ext.Window({
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

		menu = new Ext.menu.Menu();
		
		menu.add({
			text: this.contextMenuMetadataText,
			handler: showProperties,
			node: node
		});
		
		menu.showAt(event.getXY());
	},
	
	onLayerCheckChange: function(node, checked) {
		this.setVisibility(checked);
	},
	
	// handler for WMS sublayers visibility
	// creates new params for WMS layer and refreshes it
	onWmsSubLayerCheckChange: function(node, checked) {
		var layers = "", i;
		
		this.subLayers[node.layerIndex].visibility = checked;
		
		for (i=0; i<this.subLayers.length; i++) {			
			if (this.subLayers[i].visibility) {
				layers = this.subLayers[i].name + "," + layers;
			}
		}
		
		if (layers === "") {
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
		var i, layer, node, metadata;
		
		// loop all layers in map and add them to tree as separate nodes on the root
		for (i=0; i<this.map.layers.length; i++) {
			layer = this.map.layers[this.map.layers.length-1-i];
			
			if (layer.visibleInToc === false) {
				continue;
			}
			
			node = new Ext.tree.TreeNode({
				text: layer.name,
				checked: layer.getVisibility()
			});
			node.layer = layer;

			if (this.useMetadata) {
				node.metadata = {};
				metadata = node.metadata;
				metadata.openlayers = {};
				metadata.openlayers.type = layer.CLASS_NAME;
				metadata.openlayers.source = layer.url;
				
				node.on("contextmenu", this.onContextmenu, this);
			}
			
			node.on("checkchange", this.onLayerCheckChange, layer);
			this.getRootNode().appendChild(node);
 
			if (layer.CLASS_NAME==="OpenLayers.Layer.WMS") {
				if (layer.capabilitiesUrl) {
					node.subLayers = [];
					this.parseWMSCapabilities(layer, node);
				}
			}
		}
	},
	
	parseWMSCapabilities: function(layer, node) {	 
		var success, error, metadata;

		// callback function on successful request for GetCapabilities XML
		success = function(response, options) {	
			var wmslayer = Ext.DomQuery.selectNode('Layer:first', response.responseXML),
				wmsservice = Ext.DomQuery.selectNode('Service:first', response.responseXML),
				wmssublayers = Ext.DomQuery.select('Layer', wmslayer),
				toc = this;
			
			// parse name and title for top layer (the WMS service) and set the title as the text on the node
			options.node.name = Ext.DomQuery.selectNode('Name', wmslayer).firstChild.nodeValue;
			options.node.setText(Ext.DomQuery.selectNode('Title', wmslayer).firstChild.nodeValue);

			if (toc.useMetadata) {
				options.node.metadata.wms = {};
				metadata = options.node.metadata;
				metadata.wms.service = {};
				metadata.wms.service.name = Ext.DomQuery.selectNode('Name', wmsservice).firstChild.nodeValue;
				metadata.wms.service.title = Ext.DomQuery.selectNode('Title', wmsservice).firstChild.nodeValue;
				metadata.wms.service.abstacttext = Ext.DomQuery.selectNode('Abstract', wmsservice).firstChild.nodeValue;
			}
			
			toc.fillTree(options.node, wmssublayers, options.layer, null);
		};

		// callback function on failed request for GetCapabilities XML
		error = function(response, options) {
			Ext.MessageBox.show({
				title: 'Error',
				msg: 'Could not get WMS GetCapabilities',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
		};

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

Ext.reg('webgis-toc', WebGIS.Toc);
