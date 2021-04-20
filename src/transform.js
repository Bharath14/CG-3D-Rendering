import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export default class Transform
{
	constructor()
	{
		this.translate = vec3.fromValues( 0, 0, 0);
		this.scale = vec3.fromValues( 0.5, 0.5, 0.5);
		this.rotationAngle = 0;
		this.rotationAxis = vec3.fromValues( 0, 0, 1);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);

		this.mvpMatrix = this.modelTransformMatrix;
		this.viewMatrix = mat4.create();
		this.ProjectionMatrix = mat4.create();
		mat4.lookAt(this.viewMatrix, vec3.fromValues(1,0.5,1), vec3.fromValues(0, 0, -1), vec3.fromValues(0, 1, 0));
		mat4.perspective(this.ProjectionMatrix, Math.PI/2, 597/597, 1 / 256, 100);
		this.updateMVPMatrix();
	}

	getMVPMatrix()
	{
		return this.modelTransformMatrix;
	}
	updateMVPMatrix()
	{
		mat4.identity(this.modelTransformMatrix);
		
		mat4.translate(this.modelTransformMatrix, this.modelTransformMatrix, this.translate);
		
		mat4.rotate(this.modelTransformMatrix, this.modelTransformMatrix, this.rotationAngle, this.rotationAxis);
		
		mat4.scale(this.modelTransformMatrix, this.modelTransformMatrix, this.scale);
	
	}

	setTranslate(translationVec)
	{
		this.translate = translationVec;
	}

	getTranslate()
	{
		return this.translate;
	}
	
	setProjectionMatrix(projectionmat)
	{
		this.ProjectionMatrix = projectionmat;
	}

	getviewMatrix()
	{
		return this.viewMatrix;
	}

	getProjectionMatrix()
	{
		return this.ProjectionMatrix;
	}

	setviewMatrix(view)
	{
		this.viewMatrix = view;
	}

	setScale(scalingVec)
	{
		this.scale = scalingVec;
	}

	getScale()
	{
		return this.scale;
	}

	setRotate(rotationAxis, rotationAngle)
	{
		this.rotationAngle = rotationAngle;
		this.rotationAxis = rotationAxis;
	}
}