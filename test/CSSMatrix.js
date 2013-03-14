"use strict";

var browser = !!global.window;

var Matrix = require('../CSSMatrix');
var Tuple = require('../Tuple4');

var assert = {
	equal: function(expected, actual){
		if (expected !== actual)
			throw new Error("expected " + actual + " to be " + expected);
	}
};

var assertMatrix = function(expected, actual){
	var i, j, p,
		m = new Matrix(),
		letters = ['a', 'b', 'c', 'd', 'e', 'f'];
	m.setMatrixValue(expected);
	expected = m;
	for (i = 1; i <= 4; i++) for (j = 1; j <= 4; j++){
		p = 'm' + j + i;
		if (Math.abs(expected[p] - actual[p]) > Matrix.SMALL_NUMBER){
			console.log("failing matrix:", actual, "should be ", expected);
			throw new Error("Expected " + p + " to be " + expected[p] + " but was " + actual[p]);
		}
	}
	for (i = 0; i < letters.length; i++) {
		p = letters[i];
		if (Math.abs(expected[p] - actual[p]) > Matrix.SMALL_NUMBER){
			console.log("failing matrix:", actual, "should be ", expected);
			throw new Error("Expected " + p + " to be " + expected[p] + " but was " + actual[p]);
		}
	}
};


var CSSMatrix = global.CSSMatrix || global.WebKitCSSMatrix || global.MSCSSMatrix;

var results = browser && global.document.getElementById("results");

function pass(msg){
	if (!browser) console.log('\x1B[32m✓    ' + msg + '\x1B[0m');
	else results.innerHTML += '<p class="pass">' + msg + '</p>';
}

function fail(msg, err){
	if (!browser){
		console.log('\x1B[31m✘    ' + msg + '\x1B[0m');
		if (err) console.error(err);
	} else {
		results.innerHTML += '<p class="fail">' + msg + '</p>';
		if (err) results.innerHTML += '<div class="error">' + (err.stack || err.message) + "</div>";
	}
}

function testWith(ctor, name, fn){
	try {
		fn(ctor);
		pass(name);
	} catch (e){
		fail(name, e);
	}
}

function test(name, fn, native){
	if (native !== false && CSSMatrix) testWith(CSSMatrix, "native: " + name, fn);
	testWith(Matrix, name, fn);
}

test("identity", function(Matrix){
	var m = new Matrix();
	assertMatrix('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m);
});

test("str passed in constructor", function(Matrix){
	var m = new Matrix('matrix(1, 0, 0, 1, 100, 200)');
	assertMatrix('matrix(1, 0, 0, 1, 100, 200)', m);
});

test("setMatrixValue 2d", function(Matrix){
	var m = new Matrix();
	m.setMatrixValue('matrix(1, 0, 0, 1, 100, 200)');
	assertMatrix('matrix(1, 0, 0, 1, 100, 200)', m);
});

test("setMatrixValue 3d", function(Matrix){
	var m = new Matrix();
	// this is basically translate3d(100px, 200px, 10px)
	m.setMatrixValue('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 10, 1)');
	assertMatrix('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 10, 1)', m);
});

test("translate", function(Matrix){
	var m = new Matrix();
	m = m.translate(100, 200, 10);
	assertMatrix('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 10, 1)', m);
});

test("scale", function(Matrix){
	var m = new Matrix();
	m = m.scale(2);
	assertMatrix('matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m);
});

test("rotate x", function(Matrix){
	var m = new Matrix();
	m = m.rotate(90, 0, 0);
	assertMatrix('matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)', m);
});

test("rotate y", function(Matrix){
	var m = new Matrix();
	m = m.rotate(0, 90, 0);
	assertMatrix('matrix3d(0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1)', m);
});

test("rotate z", function(Matrix){
	var m = new Matrix();
	m = m.rotate(0, 0, 90);
	assertMatrix('matrix3d(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m);
});

test("rotate", function(Matrix){
	var m = new Matrix();
	m = m.rotate(90, 90, 90);
	// matrix3d(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1)
	assertMatrix('matrix3d(0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1)', m);
});

test("rotate axis angle", function(Matrix){
	var m = new Matrix();
	m = m.rotateAxisAngle(1, 0, 0, 90);
	assertMatrix('matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)', m);
});

test("rotate axis angle", function(Matrix){
	var m = new Matrix();
	m = m.rotateAxisAngle(0, -1, 0, 90);
	assertMatrix('matrix3d(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1)', m);
});

test("skewY", function(Matrix){
	var m = new Matrix();
	m = m.skewY(2);
	assertMatrix('matrix3d(1, 0.03492076949174773, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m);
});

test("skewX", function(Matrix){
	var m = new Matrix();
	m = m.skewX(2);
	assertMatrix('matrix3d(1, 0, 0, 0, 0.03492076949174773, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', m);
});

test("transform", function(Matrix){
	var m = new Matrix();
	m = m.rotate(0, 0, 90);
	var t = new Tuple(1, 0, 0, 1);
	m.transform(t);
	assert.equal( 0, t.x);
	assert.equal(-1, t.y);
	assert.equal( 0, t.z);
}, false);


test("chained1", function(Matrix){
	var m = new Matrix();
	m = m.rotate(-15, 20, 0).translate(0, 0, 80);
	assertMatrix('matrix3d(0.939693, 0, -0.342020, 0, -0.088521, 0.965926, -0.243210, 0, 0.330366, 0.258819, 0.907673, 0, 26.429287, 20.705524, 72.613870, 1)', m);
});

test("chained2", function(Matrix){
	var m = new Matrix();
	m = m.translate(0, 0, 80).rotate(-15, 20, 0);
	assertMatrix('matrix3d(0.939693, 0, -0.342020, 0, -0.088521, 0.965926, -0.243210, 0, 0.330366, 0.258819, 0.907673, 0, 0, 0, 80, 1)', m);
});

test("multiply1", function(Matrix){
	var m1 = new Matrix().rotate(-15, 20, 0);
	var m2 = new Matrix().translate(0, 0, 80);
	var m = m1.multiply(m2);
	assertMatrix('matrix3d(0.939693, 0, -0.342020, 0, -0.088521, 0.965926, -0.243210, 0, 0.330366, 0.258819, 0.907673, 0, 26.429287, 20.705524, 72.613870, 1)', m);
});

test("multiply2", function(Matrix){
	var m1 = new Matrix().rotate(-15, 20, 0);
	var m2 = new Matrix().translate(0, 0, 80);
	var m = m2.multiply(m1);
	assertMatrix('matrix3d(0.939693, 0, -0.342020, 0, -0.088521, 0.965926, -0.243210, 0, 0.330366, 0.258819, 0.907673, 0, 0, 0, 80, 1)', m);
});

