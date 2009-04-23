/**
 * WebGIS JS Library Copyright(c) 2007, Sweco Position
 * 
 * Licensed under GPLv3 http://www.gnu.org/licenses/gpl.html
 * 
 * Author: Björn Harrtell
 * 
 * @fileoverview Swedish locale for all WebGIS public classes
 */

// Global resources
WebGIS.Locale = {};
WebGIS.Locale.errorText = "Felmeddelande";

// WebGIS.Toc
Ext.apply(WebGIS.Toc.prototype, {
    windowTitleMetadataText : 'Metadata för lagret',
    contextMenuMetadataText : 'Visa metadata'
});

// Basic tools
Ext.apply(WebGIS.MapAction.ZoomInBox.prototype, {
    titleText : 'Zooma in',
    tooltipText : 'Zooma in genom att rita en rektangel'
});
Ext.apply(WebGIS.MapAction.ZoomOutBox.prototype, {
    titleText : 'Zooma ut',
    tooltipText : 'Zooma ut genom att rita en rektangel'
});
Ext.apply(WebGIS.MapAction.ZoomIn.prototype, {
    titleText : 'Zooma in',
    tooltipText : 'Zooma in ett steg'
});
Ext.apply(WebGIS.MapAction.ZoomOut.prototype, {
    titleText : 'Zooma ut',
    tooltipText : 'Zooma ut ett steg'
});
Ext.apply(WebGIS.MapAction.FullExtent.prototype, {
    titleText : 'Hela kartan',
    tooltipText : 'Visa hela kartan'
});
Ext.apply(WebGIS.MapAction.DragPan.prototype, {
    titleText : 'Panorera',
    tooltipText : 'Panorera genom att dra kartan'
});
Ext.apply(WebGIS.MapAction.PreviousExtent.prototype, {
    titleText : 'Föregående vy',
    tooltipText : 'Gå till föregående vy'
});
Ext.apply(WebGIS.MapAction.NextExtent.prototype, {
    titleText : 'Nästa vy',
    tooltipText : 'Gå till nästa vy'
});
Ext.apply(WebGIS.MapAction.NextExtent.prototype, {
    titleText : 'Nästa vy',
    tooltipText : 'Gå till nästa vy'
});

// Editor tools
Ext.apply(WebGIS.MapAction.DrawFeature.prototype, {
    titlePointText : 'Rita',
    tooltipPointText : 'Rita punkt',
    titleCurveText : 'Rita',
    tooltipCurveText : 'Rita linje',
    titlePolygonText : 'Rita',
    tooltipPolygonText : 'Rita yta'
});
Ext.apply(WebGIS.MapAction.SelectFeature.prototype, {
    titleText : 'Markera',
    tooltipText : 'Markera objekt'
});
Ext.apply(WebGIS.MapAction.RemoveSelectedFeatures.prototype, {
    titleText : 'Ta bort',
    tooltipText : 'Ta bort markerade objekt'
});
Ext.apply(WebGIS.MapAction.ModifyFeature.prototype, {
    titleText : 'Ändra',
    tooltipText : 'Ändra objekt'
});
Ext.apply(WebGIS.MapAction.DragFeature.prototype, {
    titleText : 'Flytta',
    tooltipText : 'Flytta objekt'
});

// Measure tools
Ext.apply(WebGIS.MapAction.MeasureLine.prototype, {
    titleText : 'Avståndsmätning',
    tooltipText : 'Mät avstånd genom att rita en linje'
});
Ext.apply(WebGIS.MapAction.MeasureArea.prototype, {
    titleText : 'Areamätning',
    tooltipText : 'Mät area genom att rita en polygon'
});

// Identify tools
Ext.apply(WebGIS.MapAction.Identify.prototype, {
    titleText : 'Identifiera',
    tooltipText : 'Visar attribut för geometri från en punkt i kartan (endast WMS-lager)'
});
