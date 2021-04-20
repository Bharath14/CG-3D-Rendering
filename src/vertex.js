const vertexShaderSrc = `      
        attribute vec3 aPosition;  
        attribute vec3 aColor;  
        varying vec3 vColor; 
        uniform mat4 model;
        uniform mat4 view;
        uniform mat4 projection;
        void main () 
        {
          gl_Position = projection*view*model*vec4(aPosition,1.0); 
		      gl_PointSize = 5.0;     
		      vColor = aColor;
        }                          
	  `;

export default vertexShaderSrc;