
var assert = require('assert');

var Matrix = require('./CSSMatrix');
var Tuple = require('./Tuple4');

var t = new Tuple();
var m = new Matrix();

// ### identity

m = new Matrix();
assert.equal('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m.toString());

// ### setMatrixValue

m = new Matrix();
m = m.setMatrixValue('matrix(1, 0, 0, 1, 100, 200)');
assert.equal('matrix(1, 0, 0, 1, 100, 200)', m.toString());

m = new Matrix();
// this is basically translate3d(100px, 200px, 10px)
m = m.setMatrixValue('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 10, 1)');
assert.equal('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 10, 1)', m.toString());

// ### Translate

m = new Matrix();
m = m.translate(100, 200, 10);
assert.equal('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 10, 1)', m.toString());

// ### scale

m = new Matrix();
m = m.scale(2);
assert.equal('matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m.toString());

// ### rotate x

m = new Matrix();
m = m.rotate(90, 0, 0);
assert.equal('matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1)', m.toString());

m = new Matrix();
m = m.rotate(0, 90, 0);
assert.equal('matrix3d(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1)', m.toString());

m = new Matrix();
m = m.rotate(0, 0, 90);
assert.equal('matrix3d(0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m.toString());

m = new Matrix();
m = m.rotate(90, 90, 90);
// matrix3d(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1)
// assert.equal('matrix3d(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1)', m.toString());

// ### Rotate Axis Angle

// m = new Matrix();
// m = m.rotateAxisAngle(1, 0, 0, 90);
// assert.equal('matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1)', m.toString());
//
// m = new Matrix();
// m = m.rotateAxisAngle(0, -1, 0, 90);
// assert.equal('matrix3d(0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m.toString());

// ### SkewX

m = new Matrix();
m = m.skewX(2);
assert.equal('matrix3d(1, 0.03492076949174773, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m.toString());

// ### SkwewY

m = new Matrix();
m = m.skewY(2);
assert.equal('matrix3d(1, 0, 0, 0, 0.03492076949174773, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m.toString());

// ### Translate

m = new Matrix();
m = m.rotate(0, 0, 90);
t = new Tuple(1, 0, 0, 1);
m.transform(t);
assert.equal( 0, t.x);
assert.equal(-1, t.y);
assert.equal( 0, t.z);

console.log('\neverything passed\n');
