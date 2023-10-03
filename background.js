/* eslint no-console:0 consistent-return:0 */
"use strict";

const vertexSrc = `
	// an attribute will receive data from a buffer
	attribute vec2 a_position;
	attribute vec2 a_UV;

	varying vec2 v_UV;

	// all shaders have a main function
	void main() {
		v_UV = a_UV;
		gl_Position = vec4(a_position, 0.0, 1.0);
 	}`;

const fragmentSrc = `
	precision mediump float;

	varying vec2 v_UV;

	uniform float time;

	float random (in vec2 st) {
		return fract(sin(dot(st.xy,
							vec2(12.9898,78.233)))
					* 43758.5453123);
	}

	// Value noise by Inigo Quilez - iq/2013
	// https://www.shadertoy.com/view/lsf3WH
	float noise(vec2 st) {
		vec2 i = floor(st);
		vec2 f = fract(st);
		vec2 u = f*f*(3.0-2.0*f);
		return mix( mix( random( i + vec2(0.0,0.0) ),
						random( i + vec2(1.0,0.0) ), u.x),
					mix( random( i + vec2(0.0,1.0) ),
						random( i + vec2(1.0,1.0) ), u.x), u.y);
	}

	mat2 rotate2d(float angle){
		return mat2(cos(angle),-sin(angle),
					sin(angle),cos(angle));
	}

	float lines(in vec2 pos, float b){
		float scale = 2.472;
		pos *= scale;
		return smoothstep(0.0,
						2.024+b*0.720,
						abs((sin(pos.x*3.1415)+b*0.508))*1.988);
	}

	vec3 gradient(float value){
		vec3 colorA = vec3(0.826,0.788,1.000);
		vec3 colorB = vec3(0.958,0.968,1.000);
		
		vec3 transition = vec3(sin(value * 6.333), sin(value * 3.165), value);
		
		return mix(colorA, colorB, transition);
	}

	void main() {
		vec2 st = v_UV;

		vec2 pos = st.yx*vec2(2.,2.);

		float pattern = pos.x;

		// Add noise
		pos = rotate2d( noise(pos + time) ) * pos;
		
		// Draw lines
		pattern = lines(pos, 0.5);
		
		gl_FragColor = vec4( gradient(pattern) , 1.0);
	}`;

function createShader(gl, type, source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
	}

function main() {
	// Get A WebGL context
	var canvas = document.querySelector("#c");
	var gl = canvas.getContext("webgl");
	if (!gl) {
		return;
	}

	// Get the strings for our GLSL shaders
	var vertexShaderSource = vertexSrc;
	var fragmentShaderSource = fragmentSrc;

	// create GLSL shaders, upload the GLSL source, compile the shaders
	var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	// Link the two shaders into a program
	var program = createProgram(gl, vertexShader, fragmentShader);

	// look up where the vertex data needs to go.
	var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
	var UVAttributeLocation = gl.getAttribLocation(program, "a_UV");

	// look up uniforms
	var timeLocation = gl.getUniformLocation(program, "time");

	// Create a buffer and put three 2d clip space points in it
	var positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	var positions = [
		-1, 3,
		-1, -1,
		3, -1,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	// do the same thing for the UVs
	var UVBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, UVBuffer);

	var UVs = [
		0, 2,
		0, 0,
		2, 0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(UVs), gl.STATIC_DRAW);

	var time = 0;
	var then = 0;
	requestAnimationFrame(drawScene);

	function drawScene(now) {
		now *= 0.001;
		var deltaTime = now - then;
		then = now;

		time += deltaTime / 10;

		// Tell WebGL how to convert from clip space to pixels
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Clear the canvas
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Tell it to use our program (pair of shaders)
		gl.useProgram(program);

		// Turn on the attribute
		gl.enableVertexAttribArray(positionAttributeLocation);

		// Bind the position buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size = 2;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(
			positionAttributeLocation, size, type, normalize, stride, offset);

		gl.enableVertexAttribArray(UVAttributeLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, UVBuffer);
		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size = 2;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.vertexAttribPointer(
			UVAttributeLocation, size, type, normalize, stride, offset);
		
		gl.uniform1f(timeLocation, time);
		

		// draw
		var primitiveType = gl.TRIANGLES;
		var offset = 0;
		var count = 3;
		gl.drawArrays(primitiveType, offset, count);

		requestAnimationFrame(drawScene);
	}
}

main();