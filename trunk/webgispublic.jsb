<?xml version="1.0" encoding="utf-8"?>
<project path="" name="WebGIS Public" author="SWECO Position AB" version="1.1.0" copyright="$projectName $version&#xD;&#xA;Copyright(c) 2007-2008, $author.&#xD;&#xA;&#xD;&#xA;Licensed under GPLv3&#xD;&#xA;http://www.gnu.org/licenses/gpl.html" output="$project\build" source="False" source-dir="$output\source" minify="False" min-dir="$output\build" doc="true" doc-dir="$output\docs" master="true" master-file="$output\yui-ext.js" zip="true" zip-file="$output\yuo-ext.$version.zip">
  <directory name="WebGIS" />
  <file name="WebGIS\Control\Map.js" path="Control" />
  <target name="Everything" file="$output\webgis.js" debug="True" shorthand="False" shorthand-list="YAHOO.util.Dom.setStyle&#xD;&#xA;YAHOO.util.Dom.getStyle&#xD;&#xA;YAHOO.util.Dom.getRegion&#xD;&#xA;YAHOO.util.Dom.getViewportHeight&#xD;&#xA;YAHOO.util.Dom.getViewportWidth&#xD;&#xA;YAHOO.util.Dom.get&#xD;&#xA;YAHOO.util.Dom.getXY&#xD;&#xA;YAHOO.util.Dom.setXY&#xD;&#xA;YAHOO.util.CustomEvent&#xD;&#xA;YAHOO.util.Event.addListener&#xD;&#xA;YAHOO.util.Event.getEvent&#xD;&#xA;YAHOO.util.Event.getTarget&#xD;&#xA;YAHOO.util.Event.preventDefault&#xD;&#xA;YAHOO.util.Event.stopEvent&#xD;&#xA;YAHOO.util.Event.stopPropagation&#xD;&#xA;YAHOO.util.Event.stopEvent&#xD;&#xA;YAHOO.util.Anim&#xD;&#xA;YAHOO.util.Motion&#xD;&#xA;YAHOO.util.Connect.asyncRequest&#xD;&#xA;YAHOO.util.Connect.setForm&#xD;&#xA;YAHOO.util.Dom&#xD;&#xA;YAHOO.util.Event">
    <include name="source\OpenLayers\Control\Identify.js" />
    <include name="source\Control\Toc.js" />
    <include name="source\Control\ScaleList.js" />
    <include name="source\MapAction\MapAction.js" />
    <include name="source\MapAction\Basic.js" />
    <include name="source\MapAction\Editor.js" />
    <include name="source\MapAction\Identify.js" />
    <include name="source\MapAction\Measure.js" />
    <include name="source\OpenLayers\Layer\WebGISTileServer.js" />
    <include name="resources\locale\en.js" />
  </target>
  <file name="WebGIS\Map.js" path="" />
  <file name="WebGIS\OpenLayers\Control\IdentifyBox.js" path="OpenLayers\Control" />
  <file name="WebGIS\OpenLayers\Control\ZoomOutBox.js" path="OpenLayers\Control" />
  <file name="WebGIS\MapAction\MapAction.js" path="MapAction" />
  <file name="WebGIS\MapAction\Basic.js" path="MapAction" />
  <file name="WebGIS\Control\Toc.js" path="Control" />
  <file name="WebGIS\MapAction\Editor.js" path="MapAction" />
  <file name="WebGIS\OpenLayers\Layer\Xepto.js" path="OpenLayers\Layer" />
  <directory name="source" />
  <file name="source\MapAction\Basic.js" path="MapAction" />
  <file name="source\Control\Map.js" path="Control" />
  <file name="source\Control\Toc.js" path="Control" />
  <file name="source\MapAction\Editor.js" path="MapAction" />
  <file name="source\MapAction\Identify.js" path="MapAction" />
  <file name="source\MapAction\MapAction.js" path="MapAction" />
  <file name="source\MapAction\Measure.js" path="MapAction" />
  <file name="source\OpenLayers\Control\Identify.js" path="OpenLayers\Control" />
  <file name="source\OpenLayers\Handler\Click.js" path="OpenLayers\Handler" />
  <file name="source\OpenLayers\Control\ZoomOutBox.js" path="OpenLayers\Control" />
  <file name="source\Control\ScaleList.js" path="Control" />
  <file name="source\resources\locale\sv.js" path="resources\locale" />
  <directory name="resources\locale" />
  <file name="resources\locale\en.js" path="" />
  <file name="source\OpenLayers\Layer\WebGISTileServer.js" path="OpenLayers\Layer" />
</project>