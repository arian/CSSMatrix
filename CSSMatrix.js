
// a CSSMatrix shim
// http://www.w3.org/TR/css3-3d-transforms/#cssmatrix-interface
// http://www.w3.org/TR/css3-2d-transforms/#cssmatrix-interface

/**
 * CSSMatrix Shim
 * @constructor
 */
var CSSMatrix = function(){
	var a = [].slice.call(arguments);
	if (a.length) for (var i = a.length; i--;){
		if (Math.abs(a[i]) < CSSMatrix.SMALL_NUMBER) a[i] = 0;
	}
	this.setIdentity();
	if (a.length == 16){
		this.m11 = a[0];  this.m12 = a[1];  this.m13 = a[2];  this.m14 = a[3];
		this.m21 = a[4];  this.m22 = a[5];  this.m23 = a[6];  this.m24 = a[7];
		this.m31 = a[8];  this.m32 = a[9];  this.m33 = a[10]; this.m34 = a[11];
		this.m41 = a[12]; this.m42 = a[13]; this.m43 = a[14]; this.m44 = a[15];
	} else if (a.length == 6) {
		this.affine = true;
		this.m11 = this.a = a[0]; this.m12 = this.b = a[1]; this.m14 = this.e = a[4];
		this.m21 = this.c = a[2]; this.m22 = this.d = a[3]; this.m24 = this.f = a[5];
	}
};

CSSMatrix.SMALL_NUMBER = 1e-8;

// Transformations

// http://en.wikipedia.org/wiki/Rotation_matrix

CSSMatrix.Rotate = function(rx, ry, rz){
	rx *= Math.PI / 180;
	ry *= Math.PI / 180;
	rz *= Math.PI / 180;
	// minus sin() because of right-handed system
	var cosx = Math.cos(rx), sinx = - Math.sin(rx);
	var cosy = Math.cos(ry), siny = - Math.sin(ry);
	var cosz = Math.cos(rz), sinz = - Math.sin(rz);
	var m = new CSSMatrix();

	m.m11 = cosy * cosz;
	m.m12 = - cosx * sinz + sinx * siny * cosz;
	m.m13 = sinx * sinz + cosx * siny * cosz;

	m.m21 = cosy * sinz;
	m.m22 = cosx * cosz + sinx * siny * sinz;
	m.m23 = - sinx * cosz + cosx * siny * sinz;

	m.m31 = - siny;
	m.m32 = sinx * cosy;
	m.m33 = cosx * cosy;

	return m;
};

CSSMatrix.RotateAxisAngle = function(x, y, z, angle){
	angle *= Math.PI / 180;
	var m = new CSSMatrix(), cos = Math.cos(angle), sin = Math.sin(angle);
	var cos1 = 1 - cos;

	m.m11 = cos + x * x * cos1;
	m.m12 = x * y * cos1 - z * sin;
	m.m13 = x * z * cos1 - y * sin;

	m.m21 = y * x * cos1 + z * sin;
	m.m22 = cos * y * y * cos1;
	m.m21 = y * z * cos1 - x * sin;

	m.m31 = z * x * cos1 - y * sin;
	m.m32 = z * y * cos1 + x * sin;
	m.m33 = cos + z * z * cos1;

	return m;
};

CSSMatrix.ScaleX = function(x){
	var m = new CSSMatrix();
	m.m11 = x;
	return m;
};

CSSMatrix.ScaleY = function(y){
	var m = new CSSMatrix();
	m.m22 = y;
	return m;
};

CSSMatrix.ScaleZ = function(z){
	var m = new CSSMatrix();
	m.m33 = z;
	return m;
};

CSSMatrix.Scale = function(x, y, z){
	var m = new CSSMatrix();
	m.m11 = x;
	m.m22 = y;
	m.m33 = z;
	return m;
};

CSSMatrix.SkewX = function(angle){
	angle *= Math.PI / 180;
	var m = new CSSMatrix();
	m.m21 = Math.tan(angle);
	return m;
};

CSSMatrix.SkewY = function(angle){
	angle *= Math.PI / 180;
	var m = new CSSMatrix();
	m.m12 = Math.tan(angle);
	return m;
};

CSSMatrix.Translate = function(x, y, z){
	var m = new CSSMatrix();
	m.m14 = x;
	m.m24 = y;
	m.m34 = z;
	return m;
};

CSSMatrix.multiply = function(m1, m2){

	var m11 = m1.m11 * m2.m11 + m1.m12 * m2.m21 + m1.m13 * m2.m31 + m1.m14 * m2.m41,
		m12 = m1.m11 * m2.m12 + m1.m12 * m2.m22 + m1.m13 * m2.m32 + m1.m14 * m2.m42,
		m13 = m1.m11 * m2.m13 + m1.m12 * m2.m23 + m1.m13 * m2.m33 + m1.m14 * m2.m43,
		m14 = m1.m11 * m2.m14 + m1.m12 * m2.m24 + m1.m13 * m2.m34 + m1.m14 * m2.m44,

		m21 = m1.m21 * m2.m11 + m1.m22 * m2.m21 + m1.m23 * m2.m31 + m1.m24 * m2.m41,
		m22 = m1.m21 * m2.m12 + m1.m22 * m2.m22 + m1.m23 * m2.m32 + m1.m24 * m2.m42,
		m23 = m1.m21 * m2.m13 + m1.m22 * m2.m23 + m1.m23 * m2.m33 + m1.m24 * m2.m43,
		m24 = m1.m21 * m2.m14 + m1.m22 * m2.m24 + m1.m23 * m2.m34 + m1.m24 * m2.m44,

		m31 = m1.m31 * m2.m11 + m1.m32 * m2.m21 + m1.m33 * m2.m31 + m1.m34 * m2.m41,
		m32 = m1.m31 * m2.m12 + m1.m32 * m2.m22 + m1.m33 * m2.m32 + m1.m34 * m2.m42,
		m33 = m1.m31 * m2.m13 + m1.m32 * m2.m23 + m1.m33 * m2.m33 + m1.m34 * m2.m43,
		m34 = m1.m31 * m2.m14 + m1.m32 * m2.m24 + m1.m33 * m2.m34 + m1.m34 * m2.m44,

		m41 = m1.m41 * m2.m11 + m1.m42 * m2.m21 + m1.m43 * m2.m31 + m1.m44 * m2.m41,
		m42 = m1.m41 * m2.m12 + m1.m42 * m2.m22 + m1.m43 * m2.m32 + m1.m44 * m2.m42,
		m43 = m1.m41 * m2.m13 + m1.m42 * m2.m23 + m1.m43 * m2.m33 + m1.m44 * m2.m43,
		m44 = m1.m41 * m2.m14 + m1.m42 * m2.m24 + m1.m43 * m2.m34 + m1.m44 * m2.m44;

	return new CSSMatrix(
		m11, m12, m13, m14,
		m21, m22, m23, m24,
		m31, m32, m33, m34,
		m41, m42, m43, m44
	);
};

// w3c defined methods

/**
 * The setMatrixValue method replaces the existing matrix with one computed
 * from parsing the passed string as though it had been assigned to the
 * transform property in a CSS style rule.
 * @param {String} string The string to parse.
 */
CSSMatrix.prototype.setMatrixValue = function(string){
	string = String(string).trim();
	var m = this;
	m.setIdentity();
	if (string == 'none') return m;
	var type = string.slice(0, string.indexOf('(')), parts, i;
	if (type == 'matrix3d'){
		parts = string.slice(9, -1).split(',');
		for (i = parts.length; i--;) parts[i] = parseFloat(parts[i]);
		m.m11 = parts[0]; m.m12 = parts[4]; m.m13 = parts[8];  m.m14 = parts[12];
		m.m21 = parts[1]; m.m22 = parts[5]; m.m23 = parts[9];  m.m24 = parts[13];
		m.m31 = parts[2]; m.m32 = parts[6]; m.m33 = parts[10]; m.m34 = parts[14];
		m.m41 = parts[3]; m.m42 = parts[7]; m.m43 = parts[11]; m.m44 = parts[15];
	} else if (type == 'matrix'){
		m.affine = true;
		parts = string.slice(7, -1).split(',');
		for (i = parts.length; i--;) parts[i] = parseFloat(parts[i]);
		m.m11 = m.a = parts[0]; m.m12 = m.b = parts[2]; m.m14 = m.e = parts[4];
		m.m21 = m.c = parts[1]; m.m22 = m.d = parts[3]; m.m24 = m.f = parts[5];
	} else {
		throw new TypeError('Invalid Matrix Value');
	}
	return m;
};

/**
 * The multiply method returns a new CSSMatrix which is the result of this
 * matrix multiplied by the passed matrix, with the passed matrix to the right.
 * This matrix is not modified.
 *
 * @param {CSSMatrix} m2
 * @return {CSSMatrix} The result matrix.
 */
CSSMatrix.prototype.multiply = function(m2){
	return CSSMatrix.multiply(this, m2);
};

/**
 * The inverse method returns a new matrix which is the inverse of this matrix.
 * This matrix is not modified.
 *
 * method not implemented yet
 */
CSSMatrix.prototype.inverse = function(){
	throw new Error('the inverse() method is not implemented (yet).');
};

/**
 * The translate method returns a new matrix which is this matrix post
 * multiplied by a translation matrix containing the passed values. If the z
 * component is undefined, a 0 value is used in its place. This matrix is not
 * modified.
 *
 * @param {number} x X component of the translation value.
 * @param {number} y Y component of the translation value.
 * @param {number=} z Z component of the translation value.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.translate = function(x, y, z){
	if (z == null) z = 0;
	return CSSMatrix.multiply(this, new CSSMatrix.Translate(x, y, z));
};

/**
 * The scale method returns a new matrix which is this matrix post multiplied by
 * a scale matrix containing the passed values. If the z component is undefined,
 * a 1 value is used in its place. If the y component is undefined, the x
 * component value is used in its place. This matrix is not modified.
 *
 * @param {number} x The X component of the scale value.
 * @param {number=} y The Y component of the scale value.
 * @param {number=} z The Z component of the scale value.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.scale = function(x, y, z){
	if (y == null) y = x;
	if (z == null) z = 1;
	return CSSMatrix.multiply(this, new CSSMatrix.Scale(x, y, z));
};

/**
 * The rotate method returns a new matrix which is this matrix post multiplied
 * by each of 3 rotation matrices about the major axes, first X, then Y, then Z.
 * If the y and z components are undefined, the x value is used to rotate the
 * object about the z axis, as though the vector (0,0,x) were passed. All
 * rotation values are in degrees. This matrix is not modified.
 *
 * @param {number} rx The X component of the rotation value, or the Z component if the rotY and rotZ parameters are undefined.
 * @param {number=} ry The (optional) Y component of the rotation value.
 * @param {number=} rz The (optional) Z component of the rotation value.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.rotate = function(rx, ry, rz){
	if (ry == null) ry = rx;
	if (rz == null) rz = rx;
	return CSSMatrix.multiply(this, new CSSMatrix.Rotate(rx, ry, rz));
};

/**
 * The rotateAxisAngle method returns a new matrix which is this matrix post
 * multiplied by a rotation matrix with the given axis and angle. The right-hand
 * rule is used to determine the direction of rotation. All rotation values are
 * in degrees. This matrix is not modified.
 *
 * @param {number} x The X component of the axis vector.
 * @param {number=} y The Y component of the axis vector.
 * @param {number=} z The Z component of the axis vector.
 * @param {number} angle The angle of rotation about the axis vector, in degrees.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.rotateAxisAngle = function(x, y, z, angle){
	if (y == null) y = x;
	if (z == null) z = x;
	return CSSMatrix.multiply(this, new CSSMatrix.RotateAxisAngle(x, y, z, angle));
};

// Defined in WebKitCSSMatrix, but not in the w3c draft

/**
 * Specifies a skew transformation along the x-axis by the given angle.
 *
 * @param {number} angle The angle amount in degrees to skew.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.skewX = function(angle){
	return CSSMatrix.multiply(this, new CSSMatrix.SkewX(angle));
};

/**
 * Specifies a skew transformation along the x-axis by the given angle.
 *
 * @param {number} angle The angle amount in degrees to skew.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.skewY = function(angle){
	return CSSMatrix.multiply(this, new CSSMatrix.SkewY(angle));
};

/**
 * Returns a string representation of the matrix.
 * @return {string}
 */
CSSMatrix.prototype.toString = function(){
	var m = this;
	if (this.affine){
		return  'matrix(' + [
			m.m11, m.m12,
			m.m21, m.m22,
			m.m14, m.m24
		].join(', ') + ')';
	}
	// note: the elements here are transposed
	return  'matrix3d(' + [
		m.m11, m.m21, m.m31, m.m41,
		m.m12, m.m22, m.m32, m.m42,
		m.m13, m.m23, m.m33, m.m43,
		m.m14, m.m24, m.m34, m.m44
	].join(', ') + ')';
};

// Additional methods

/**
 * Set the current matrix to the identity form
 *
 * @return {CSSMatrix} this matrix
 */
CSSMatrix.prototype.setIdentity = function(){
	var m = this;
	m.m11 = 1; m.m12 = 0; m.m13 = 0; m.m14 = 0;
	m.m21 = 0; m.m22 = 1; m.m23 = 0; m.m24 = 0;
	m.m31 = 0; m.m32 = 0; m.m33 = 1; m.m34 = 0;
	m.m41 = 0; m.m42 = 0; m.m43 = 0; m.m44 = 1;
	return this;
};

/**
 * Transform a tuple (3d point) with this CSSMatrix
 *
 * @param {Tuple} an object with x, y, z and w properties
 * @return {Tuple} the passed tuple
 */
CSSMatrix.prototype.transform = function(t /* tuple */ ){
	var m = this;

	var x = m.m11 * t.x + m.m12 * t.y + m.m13 * t.z + m.m14 * t.w,
		y = m.m21 * t.x + m.m22 * t.y + m.m23 * t.z + m.m24 * t.w,
		z = m.m31 * t.x + m.m32 * t.y + m.m33 * t.z + m.m34 * t.w,
		w = m.m41 * t.x + m.m42 * t.y + m.m43 * t.z + m.m44 * t.w;

	t.x = x / w;
	t.y = y / w;
	t.z = z / w;

	return t;
};

CSSMatrix.prototype.toFullString = function(){
	var m = this;
	return [
		[m.m11, m.m12, m.m13, m.m14].join(', '),
		[m.m21, m.m22, m.m23, m.m24].join(', '),
		[m.m31, m.m32, m.m33, m.m34].join(', '),
		[m.m41, m.m42, m.m43, m.m44].join(', ')
	].join('\n');
};

(function (name, definition){
  if (typeof define === 'function'){ // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(),
        global = this, old = global[name];
    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('CSSMatrix', function () {
  // return the module's API
  return CSSMatrix;
});

