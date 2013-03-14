CSSMatrix
=========

[![Build Status](https://secure.travis-ci.org/arian/CSSMatrix.png?branch=master)](http://travis-ci.org/arian/CSSMatrix)

This is a CSSMatrix class as defined by the [w3c CSS3 3d Transforms](http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/#cssmatrix-interface) specification.

### Installation

	npm install CSSMatrix

### Usage

It should be compatible with documentation defined at [w3.org](http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/#cssmatrix-interface) and at [WebKitCSSMatrix](https://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariCSSRef/Articles/Functions.html#//apple_ref/css/func/matrix3d) Safari documentation.

__Methods:__

- translate(x, y, z)
- scale(x, y, z)
- rotate(rx, ry, rz)
- rotateAxisAngle(x, y, z, angle)
- skewX(angle)
- skewY(angle)
- toString()

__Additional Methods__:

- transform(tuple)
- toFullString()

__Properties:__

- m11 to m44. m12 is the second element in the first row.
