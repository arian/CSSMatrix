CSSMatrix
=========

[![Build Status](https://secure.travis-ci.org/arian/CSSMatrix.png?branch=master)](http://travis-ci.org/arian/CSSMatrix)

This is a CSSMatrix class as defined by the [w3c CSS3 3d Transforms](http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/#cssmatrix-interface) specification.

### Installation

	npm install CSSMatrix

### Usage

It should be compatible with documentation defined at [w3.org](http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/#cssmatrix-interface) and at [WebKitCSSMatrix](https://developer.apple.com/library/iad/documentation/AudioVideo/Reference/WebKitCSSMatrixClassReference/index.html) Safari documentation.

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

## MIT License

Copyright (c) 2013 Arian Stolwijk

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
