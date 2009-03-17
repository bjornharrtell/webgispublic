/**
 * WebGIS JS Library
 * Copyright(c) 2008, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 */

/**
 * An extended TreePanel that couples with a layer to view its features
 * 
 * @constructor
 * @augments Ext.tree.TreePanel
 * @param {Object}
 *            config
 */
WebGIS.FeaturesTreePanel = function(config) {

	var root = new Ext.tree.TreeNode( {
		draggable :false
	});

	Ext.apply(this, {
	    root :root,
	    rootVisible :false
	});

	WebGIS.FeaturesTreePanel.superclass.constructor.apply(this, arguments);

	/**
	 * @param {Array}
	 *            options.features
	 * @param {String}
	 *            options.source
	 */
	this.addFeatures = function(options) {
		var name = options.source;
		var features = options.features;

		if (!name) {
			name = 'Unknown source';
		}

		var resultNode = new Ext.tree.TreeNode( {
			text :name
		});
		root.appendChild(node);

		for ( var i = 0; i < features.length; i++) {
			node = new Ext.tree.TreeNode( {
				// TODO: get most likely attribute to be a text field and use it
				    // to name the feature, else use the FID
				    text :i
			    });

			resultNode.appendChild(node);
		}
	};
};

Ext.extend(WebGIS.FeaturesTreePanel, Ext.tree.TreePanel);

Ext.reg('webgis-featurestreepanel', WebGIS.FeaturesTreePanel);