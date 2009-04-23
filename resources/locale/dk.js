/**
 * WebGIS JS Library Copyright(c) 2007, Sweco Position
 * 
 * Licensed under GPLv3 http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Leif Uller
 * 
 * @fileoverview Danish locale for all WebGIS public classes
 */

// Global resources
WebGIS.Locale = {};
WebGIS.Locale.errorText = "Fejlmeddelelse";

// WebGIS.Toc
Ext.apply(WebGIS.Toc.prototype, {
    windowTitleMetadataText : 'Metadata for lag',
    contextMenuMetadataText : 'Vis metadata'
});

// Basic tools
Ext.apply(WebGIS.MapAction.ZoomInBox.prototype, {
    titleText : 'Zoom ind',
    tooltipText : 'Zoom ind ved at tegne et rektangel'
});
Ext.apply(WebGIS.MapAction.ZoomOutBox.prototype, {
    titleText : 'Zoom ud',
    tooltipText : 'Zoom ud ved at tegne et rektangel'
});
Ext.apply(WebGIS.MapAction.ZoomIn.prototype, {
    titleText : 'Zoom ind',
    tooltipText : 'Zoome ind et trin'
});
Ext.apply(WebGIS.MapAction.ZoomOut.prototype, {
    titleText : 'Zoom ud',
    tooltipText : 'Zoom ud et trin'
});
Ext.apply(WebGIS.MapAction.FullExtent.prototype, {
    titleText : 'Hele kort',
    tooltipText : 'Vis hele kortet'
});
Ext.apply(WebGIS.MapAction.DragPan.prototype, {
    titleText : 'Pan',
    tooltipText : 'Pan ved at trække i kortet'
});
Ext.apply(WebGIS.MapAction.PreviousExtent.prototype, {
    titleText : 'Forrige view',
    tooltipText : 'Gå til forrige view'
});
Ext.apply(WebGIS.MapAction.NextExtent.prototype, {
    titleText : 'Næste view',
    tooltipText : 'Gå til næste view'
});
Ext.apply(WebGIS.MapAction.NextExtent.prototype, {
    titleText : 'Næste view',
    tooltipText : 'Gå til næste view'
});

// Editor tools
Ext.apply(WebGIS.MapAction.DrawFeature.prototype, {
    titlePointText : 'Plot',
    tooltipPointText : 'Plot punkt',
    titleCurveText : 'Tegn',
    tooltipCurveText : 'Tegn linie',
    titlePolygonText : 'Tegn',
    tooltipPolygonText : 'Tegn overflade'
});
Ext.apply(WebGIS.MapAction.SelectFeature.prototype, {
    titleText : 'Vælg',
    tooltipText : 'Vælg objekt'
});
Ext.apply(WebGIS.MapAction.RemoveSelectedFeatures.prototype, {
    titleText : 'Slet',
    tooltipText : 'Slet valgte objekter'
});
Ext.apply(WebGIS.MapAction.ModifyFeature.prototype, {
    titleText : 'Ændre',
    tooltipText : 'Ændring af objekter'
});
Ext.apply(WebGIS.MapAction.DragFeature.prototype, {
    titleText : 'Bevæge',
    tooltipText : 'Bevæge objekt'
});

// Measure tools
Ext.apply(WebGIS.MapAction.MeasureLine.prototype, {
    titleText : 'Afstandsmåling',
    tooltipText : 'Mål afstanden ved at tegne en linie'
});
Ext.apply(WebGIS.MapAction.MeasureArea.prototype, {
    titleText : 'Areamålning',
    tooltipText : 'Mål area ved at tegne en polygon'
});

// Identify tools
Ext.apply(WebGIS.MapAction.Identify.prototype, {
    titleText : 'Identificer',
    tooltipText : 'Viser attributter af geometri fra et punkt på kortet (kun WMS lag)'
});
