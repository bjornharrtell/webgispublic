/**
 * WebGIS JS Library
 * Copyright(c) 2007, Sweco Position
 *
 * Licensed under GPLv3
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 *
 * @fileoverview English locale for all WebGIS public classes
 */

// Global resources
WebGIS.Locale = {};
WebGIS.Locale.errorText = "Error message";

// WebGIS.Toc
Ext.apply(WebGIS.Toc.prototype, {
	windowTitleMetadataText: 'Metadata for this layer',
	contextMenuMetadataText: 'Show metadata'
});

// WebGIS.Control.ScaleList
Ext.apply(WebGIS.ScaleList.prototype, {
	configErrorText: 'Requires defined resolutions array in map configuration'
});

// Basic tools
Ext.apply(WebGIS.MapAction.ZoomInBox.prototype, {
	titleText: 'Zoom in',
	tooltipText: 'Zoom in by drawing a rectangle'
});
Ext.apply(WebGIS.MapAction.ZoomOutBox.prototype, {
	titleText: 'Zoom out',
	tooltipText: 'Zoom out by drawing a rectangle'
});
Ext.apply(WebGIS.MapAction.ZoomIn.prototype, {
	titleText: 'Zoom in',
	tooltipText: 'Zoom in one step'
});
Ext.apply(WebGIS.MapAction.ZoomOut.prototype, {
	titleText: 'Zoom out',
	tooltipText: 'Zoom out one step'
});
Ext.apply(WebGIS.MapAction.FullExtent.prototype, {
	titleText: 'Full extent',
	tooltipText: 'Zoom to the full map extent'
});
Ext.apply(WebGIS.MapAction.DragPan.prototype, {
	titleText: 'Pan',
	tooltipText: 'Pan by dragging the map'
});
Ext.apply(WebGIS.MapAction.PreviousExtent.prototype, {
	titleText: 'Previous extent',
	tooltipText: 'Go to previous extent'
});
Ext.apply(WebGIS.MapAction.NextExtent.prototype, {
	titleText: 'Next extent',
	tooltipText: 'Go to next extent'
});

// Editor tools
Ext.apply(WebGIS.MapAction.DrawFeature.prototype, {
	titlePointText:		'Draw',
	tooltipPointText:	'Draw point',
	titleCurveText:		'Draw',
	tooltipCurveText:	'Draw line',
	titlePolygonText:	'Draw',
	tooltipPolygonText:	'Draw polygon'
});
Ext.apply(WebGIS.MapAction.SelectFeature.prototype, {
	titleText: 'Select',
	tooltipText: 'Select geometry'
});
Ext.apply(WebGIS.MapAction.RemoveSelectedFeatures.prototype, {
	titleText: 'Remove',
	tooltipText: 'Remove geometry'
});
Ext.apply(WebGIS.MapAction.ModifyFeature.prototype, {
	titleText: 'Modify',
	tooltipText: 'Modify geometry'
});
Ext.apply(WebGIS.MapAction.DragFeature.prototype, {
	titleText: 'Move',
	tooltipText: 'Move geometry'
});

// Measure tools
Ext.apply(WebGIS.MapAction.MeasureLine.prototype, {
	titleText: 'Measure distance',
	tooltipText: 'Measure distance by drawing a line'
});
Ext.apply(WebGIS.MapAction.MeasureArea.prototype, {
	titleText: 'Measure area',
	tooltipText: 'Measure distance by drawing a polygon'
});

// Identify tools
Ext.apply(WebGIS.MapAction.Identify.prototype, {
	titleText: 'Identify',
	tooltipText: 'Shows attributes for an object in the map (only WMS-layers)'
});
