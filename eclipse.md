[Eclipse](http://www.eclipse.org) is a development IDE that can be used for all kinds of stuff.

## Eclipse as IDE and project manager ##

Amongst others, the file .project in the root of the source code is what makes it a Eclipse project. Eclipse will recognize the project and it can be directly imported by using a Subversion plugin for Eclipse which is recommended.

Eclipse is probably the best IDE right now for javascript development and project handling and it also has excellent custom building and deployment features.

## Building and deploying ##

[Ant](http://ant.apache.org) is integrated in Eclipse and is a tool intended for building/deploying source code. Scripts for creating a release build, deploying debug version and example pages is available.

The build scripts assume that they are run in the root of the project and are configured as "Builders" in the project. Builders can be configured to be automatically run when saving source code changes which can be useful when debugging.

There are two deployment scrips, buildscripts\debug.xml and buildscripts\examples.xml

The deployment scripts use a property called weblocation that is used to define the path where the application should be deployed. A way of setting this property is to create a property file with a single line in it like this:

weblocation = c:\\pathtofolder

The properties file for the buildscripts\debug.xml is preconfigured in the project to use buildscripts\debug.properties - When first opening the project it the build process will complain and fail until you creat this file.

The release build script buildscripts\release.xml concats the source and runs it though the YUI compressor which is included in buildtools. The created release library is put in the build directory.

NOTE: In Eclipse there is a mechanism for publishing web application, but it's not very flexible so the recommended way to do it is via the ant scripts.