import objLoader from 'https://cdn.skypack.dev/webgl-obj-loader';
import { vec3, vec4, mat4 } from 'https://cdn.skypack.dev/gl-matrix';
import Transform from './transform.js'
export default class Mesh
{
	constructor(gl, filepath, color_,color_form = "default")
	{
		this.vertexPositionData = [];
		this.vertexIndices = [];
		(async() =>
		{
			const repsonse = await fetch(filepath);
			const objReadAsString = await repsonse.text();
			const meshData = new objLoader.Mesh(objReadAsString);
			this.vertexPositionData = new Float32Array(meshData.vertices);
			this.vertexIndices = new Uint16Array(meshData.indices);
		}) ()
		this.colorcode = color_;
		this.colorform = color_form;
		
		this.gl = gl;

		this.buffer = this.gl.createBuffer();
		if (!this.buffer)
		{
			throw new Error("Buffer could not be allocated");
		}
		
		this.transform = new Transform();
	}
	draw(shader)
	{
		this.color = [];
		if(this.colorform == "default")
		{
			for(var i =0;i<this.vertexPositionData.length/3;i++) 
			{
				this.color = this.color.concat(this.colorcode);
			}
		}
		else
		{
			for(var i =0;i<this.vertexPositionData.length/3;i++) 
			{
				this.color = this.color.concat([0,0,0]);
			}
		}
		const uModelTransformMatrix = shader.uniform("model");	
		shader.setUniform4f(uModelTransformMatrix, this.transform.getMVPMatrix());	
		const elementPerVertex = 3;
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexPositionData, this.gl.DYNAMIC_DRAW);

		const uModelViewMatrix = shader.uniform("view");
		shader.setUniform4f(uModelViewMatrix, this.transform.viewMatrix);
        
		const uProjectionMatrix = shader.uniform("projection");
		shader.setUniform4f(uProjectionMatrix, this.transform.ProjectionMatrix);

		const aPosition = shader.attribute("aPosition");
		this.gl.enableVertexAttribArray(aPosition);
		this.gl.vertexAttribPointer(aPosition, elementPerVertex, this.gl.FLOAT, false, 3 * this.vertexPositionData.BYTES_PER_ELEMENT, 0);
		
		this.colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.color), this.gl.STATIC_DRAW);

        const aColor = shader.attribute("aColor");
        this.gl.enableVertexAttribArray(aColor);
        this.gl.vertexAttribPointer(aColor, elementPerVertex, this.gl.FLOAT, false, 0, 0);

		const indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndices, this.gl.DYNAMIC_DRAW);

		this.gl.drawElements(this.gl.TRIANGLES, this.vertexIndices.length, this.gl.UNSIGNED_SHORT, indexBuffer);
	}
}