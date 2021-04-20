import Shader from "./shader.js";
import vertexShaderSrc from "./vertex.js";
import fragmentShaderSrc from "./fragment.js";
import Renderer from "./renderer.js";
import Mesh from "./mesh.js";
import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

const renderer = new Renderer();
const gl = renderer.webglcontext();

const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use();

function defaultColor() {
    cube.colorform = "default";
    diamond.colorform = "default";
    teapot.colorform = "default";
    cone_base.colorform = "default";
    cone_top.colorform = "default";
}

let mode = 0;
let mode_x = 0;
let mode_y = 0;
let mode_z = 0;
let mode_face =0;
let mode_obj =0;
let userinteracting = false;
const y_axis = new Mesh(gl,"/src/axis_1.obj",[0,1,0]);
y_axis.transform.setScale([0.2,0.3,0.2]);
y_axis.transform.setRotate([0,1,0],(Math.PI/2));
y_axis.transform.setTranslate([0,0.6,-0.5]);
//y_axis.transform.setTranslate([0,1,0]);
y_axis.transform.updateMVPMatrix();

const x_axis = new Mesh(gl,"/src/axis_1.obj",[1,0,0]);
x_axis.transform.setScale([0.2,0.3,0.2]);
x_axis.transform.setRotate([0,0,1],-(Math.PI)/2);
x_axis.transform.setTranslate([0.6,0,-0.5]);
//z_axis.transform.setTranslate([1,0,0]);
x_axis.transform.updateMVPMatrix();

const z_axis = new Mesh(gl,"/src/axis_1.obj",[0,0,1]);
z_axis.transform.setScale([0.2,0.25,0.2]);
z_axis.transform.setRotate(vec3.fromValues(1,0,0),Math.PI/2);
z_axis.transform.setTranslate([0,0,0]);
//z_axis.transform.setTranslate([0,0,1]);
z_axis.transform.updateMVPMatrix();
//x_axis.changeTransformSettings(transform);

const diamond = new Mesh(gl,"/src/diamond.obj",[1,1,0])
diamond.transform.setScale([0.004,0.004,0.004]);
diamond.transform.setTranslate([0.0,0.0,-0.5]);
diamond.transform.setRotate(vec3.fromValues(1,0,0),Math.PI/2);
//diamond.transform.setTranslate([0.0,0.6,-0.5]);
//diamond.transform.setRotate(vec3.fromValues(0,1,0),Math.PI/6);
diamond.transform.updateMVPMatrix();

const cube = new Mesh(gl,"/src/cube.obj",[0,1,1])
cube.transform.setScale([0.2,0.2,0.2]);
cube.transform.setTranslate([0.0,0.0,-0.5]);
//cube.transform.setTranslate([-0.6,0,-0.5])
//cube.transform.setRotate(vec3.fromValues(1,0,0),Math.PI/2);
//diamond.transform.setRotate(vec3.fromValues(0,1,0),Math.PI/6);
cube.transform.updateMVPMatrix();

const teapot = new Mesh(gl,"/src/teapot.obj",[1,0,1])
teapot.transform.setScale([0.004,0.004,0.004]);
teapot.transform.setTranslate([0,0,-0.5]);
//teapot.transform.setTranslate([0.6,-0.6,-0.5]);
teapot.transform.updateMVPMatrix();

const cone_base = new Mesh(gl,"/src/cone_base.obj",[1,0.5,0.5]);
cone_base.transform.setScale([0.3,0.3,0.3]);
cone_base.transform.setTranslate([0,0,-0.5]);
cone_base.transform.setRotate([1,0,0],(-Math.PI/2));
//cone_base.transform.setRotate([0,1,0],(Math.PI/4));
cone_base.transform.updateMVPMatrix();

const cone_top = new Mesh(gl,"/src/cone_top.obj",[1,0.51,0.5]);
cone_top.transform.setScale([0.3,0.3,0.3]);
cone_top.transform.setTranslate([0,0,-0.5]);
cone_top.transform.setRotate([1,0,0],(-Math.PI/2));
//cone_top.transform.setRotate([0,1,0],(Math.PI/4));
cone_top.transform.updateMVPMatrix();

window.onload = () => {
    window.addEventListener("keydown",function(event){
        switch(true)
        {
            case event.key == "d":
                defaultColor();
                mode = 0;
                diamond.transform.setTranslate([0.0,0.6,-0.5]);
                diamond.transform.updateMVPMatrix();

                cube.transform.setTranslate([-0.6,0,-0.5]);
                cube.transform.updateMVPMatrix();

                teapot.transform.setTranslate([0.6,-0.6,-0.5]);
                teapot.transform.updateMVPMatrix();
                break;
    
            case event.key == "e":
                defaultColor();
                mode = 0;
                diamond.transform.setTranslate([-0.3,0.3,-0.5]);
                diamond.transform.updateMVPMatrix();

                cube.transform.setTranslate([0,-0.3,-0.5]);
                cube.transform.updateMVPMatrix();

                teapot.transform.setTranslate([0.3,0,-0.5]);
                teapot.transform.updateMVPMatrix();
                break;
            case event.key == "f":
                defaultColor();
                mode = 0;
                var rot_te = teapot.transform.rotationAngle;
                teapot.transform.setRotate([1,0,0],(rot_te+Math.PI/2));
                teapot.transform.updateMVPMatrix();

                var rot_di = diamond.transform.rotationAngle;
                diamond.transform.setRotate([0,1,0],(rot_di+Math.PI/2));
                diamond.transform.updateMVPMatrix();

                var rot_cu = cube.transform.rotationAngle;
                cube.transform.setRotate([0,0,1],(rot_cu+Math.PI/2));
                cube.transform.updateMVPMatrix();
                break;
            case event.key == "g":
                defaultColor();
                mode = 0;
                var scale_te = (teapot.transform.getScale());
                var output_te = scale_te.map(x=>x*0.5);
                teapot.transform.setScale(output_te);
                teapot.transform.updateMVPMatrix();

                var scale_di = diamond.transform.getScale();
                var output_di = scale_di.map(x=>x*2);
                diamond.transform.setScale(output_di);
                diamond.transform.updateMVPMatrix();

                var scale_cu = cube.transform.getScale();
                var output_cu = scale_cu.map(x=>x*3);
                cube.transform.setScale(output_cu);
                cube.transform.updateMVPMatrix();
                break;
            case event.key == "r":
                defaultColor();
                mode = 0;
                let viewMatrix = mat4.create();
                mat4.lookAt(viewMatrix, vec3.fromValues(1,0.5,1), vec3.fromValues(0, 0, -1), vec3.fromValues(0, 1, 0));
                x_axis.transform.setviewMatrix(viewMatrix);
                x_axis.transform.updateMVPMatrix();

                
                y_axis.transform.setviewMatrix(viewMatrix);
                y_axis.transform.updateMVPMatrix();

                
                z_axis.transform.setviewMatrix(viewMatrix);
                z_axis.transform.updateMVPMatrix();

                teapot.transform.setRotate([0,0,1],0);
                teapot.transform.setviewMatrix(viewMatrix);
                teapot.transform.setScale([0.004,0.004,0.004]);
                teapot.transform.updateMVPMatrix();

                diamond.transform.setRotate([1,0,0],Math.PI/2);
                diamond.transform.setviewMatrix(viewMatrix);
                diamond.transform.setScale([0.004,0.004,0.004]);
                diamond.transform.updateMVPMatrix();

                cube.transform.setRotate([0,0,1],0);
                cube.transform.setviewMatrix(viewMatrix);
                cube.transform.setScale([0.2,0.2,0.2]);
                cube.transform.updateMVPMatrix();

                cone_base.transform.setviewMatrix(viewMatrix);
                cone_base.transform.updateMVPMatrix();

                cone_top.transform.setviewMatrix(viewMatrix);
                cone_top.transform.updateMVPMatrix();


                break;
            case event.key == "i":
                defaultColor();
                 mode = 1;
                 break;
            case event.key == "x":
                defaultColor();
                if(mode == 1)
                {
                    mode_x = 1;
                    mode_y = 0;
                    mode_z = 0;
                }
                break;
            case event.key == "y":
               defaultColor();
                if(mode == 1)
                {
                    mode_x = 0;
                    mode_y = 1;
                    mode_z = 0;
                }
                break;
            case event.key == "z":
               defaultColor();
                if(mode == 1)
                {
                    mode_x = 0;
                    mode_y = 0;
                    mode_z = 1;
                }
                break;
            case event.key == "h":
               defaultColor();
                mode = 2;
                break;
            case event.key == "o":
                defaultColor();
                if(mode == 2)
                {
                    mode_face =0;
                    mode_obj = 1;
                }
                break;
            case event.key == "p":
                defaultColor();
                if(mode == 2)
                {
                    mode_face = 1;
                    mode_obj = 0;
                }
        }
    });
    var mouseX;
    var mouseY;
    let theta = 0;
    var map = {};
    function read(x, y) 
    {
        var string = String(x) + String(y);
        if (string in map) {
            return map[string];
        } else {

            var pixel = new Uint8Array(4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
            map[string] = pixel;
            return pixel;
        }
    }
    function arraysEqual(a1, a2) 
    {
        return JSON.stringify(a1) == JSON.stringify(a2);
    }
    renderer.getcanvas().addEventListener("mousedown", function(event){
        if(mode == 1)
        {
            mouseX = event.clientX;
            mouseY = event.clientY;
            userinteracting = true;
            theta =0;
        }
        else if(mode == 2)
        {
            if(mode_obj==1)
                {
                var selectX = event.clientX;
                var selectY = event.clientY;
    
                var rect = event.target.getBoundingClientRect();
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.clearColor(1, 1, 1, 1);
                animate();
                var pixels = Array.from(read(selectX - rect.left, rect.bottom - selectY));
                var cubeColor = [0,255,255,255];
                var teapotColor = [255,0,255,255];
                var diamondColor = [255,255,0,255];
                var conebaseColor = [255,128,128,255];
                var conetopColor = [255,130,128,255]
                if (arraysEqual(pixels, cubeColor)) 
                {
                    defaultColor();
                    cube.colorform = "select";
                } 
                else if (arraysEqual(pixels, teapotColor)) 
                {
                    defaultColor();
                    teapot.colorform = "select";
                } 
                else if (arraysEqual(pixels, diamondColor)) 
                {
                    defaultColor();
                    diamond.colorform = "select";
                } 
                else if (arraysEqual(pixels, conebaseColor)) 
                {
                    defaultColor();
                    cone_base.colorform = "select";
                    cone_top.colorform = "select";
                } 
                else if (arraysEqual(pixels, conetopColor)) 
                {
                    defaultColor();
                    cone_top.colorform = "select";
                    cone_base.colorform = "select";

                } 
                else 
                {
                    defaultColor();
                }
            }
            else if (mode_face == 1)
            {
                var selectX = event.clientX;
                var selectY = event.clientY;

                var rect = event.target.getBoundingClientRect();
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.clearColor(1, 1, 1, 1);
                animate();
                var pixels = Array.from(read(selectX - rect.left, rect.bottom - selectY));
                var conebaseColor = [255,128,128,255];
                var conetopColor = [255,130,128,255]
                if (arraysEqual(pixels, conebaseColor)) 
                {
                    defaultColor();
                    cone_base.colorform = "select";
                } 
                else if (arraysEqual(pixels, conetopColor)) 
                {
                    defaultColor();
                    cone_top.colorform = "select";
                } 
                else 
                {
                    defaultColor();
                }

            }
        }   
    });
  
    renderer.getcanvas().addEventListener("mousemove", function(event){
       
        if(mode == 1)
        {
            if(userinteracting == true)
            {   
                
                if(mode_x == 1)
                {
                    let dragX = event.clientX;
                    let dragY = event.clientY;

                    let temp = Math.atan2(dragY-mouseY,dragX-mouseX);

                    if((-90 < (temp*180/Math.PI)) && ((temp*180/Math.PI) < 90))
                    {
                        theta = theta+1;
                        //console.log("right");
                        //console.log(temp*180/Math.PI)
                    }
                    else
                    {
                        theta = theta-1;
                        //console.log("left");
                        //console.log(temp*180/Math.PI);
                    }
                    //console.log(dragX)
                    let viewMatrix = mat4.create();
                    mat4.lookAt(viewMatrix, vec3.fromValues(1,0.5*Math.cos(theta)+1*Math.sin(theta),-0.5*Math.sin(theta)+1*Math.cos(theta)), vec3.fromValues(0, 0, -1), vec3.fromValues(0, 1, 0));
                    x_axis.transform.setviewMatrix(viewMatrix);
                    x_axis.transform.updateMVPMatrix();
                    y_axis.transform.setviewMatrix(viewMatrix);
                    y_axis.transform.updateMVPMatrix();
                    z_axis.transform.setviewMatrix(viewMatrix);
                    z_axis.transform.updateMVPMatrix();
                    diamond.transform.setviewMatrix(viewMatrix);
                    diamond.transform.updateMVPMatrix();
                    cube.transform.setviewMatrix(viewMatrix);
                    cube.transform.updateMVPMatrix();
                    teapot.transform.setviewMatrix(viewMatrix);
                    teapot.transform.updateMVPMatrix();
                    cone_base.transform.setviewMatrix(viewMatrix);
                    cone_base.transform.updateMVPMatrix();
                    cone_top.transform.setviewMatrix(viewMatrix);
                    cone_top.transform.updateMVPMatrix();

                    mouseX = event.clientX;
                    mouseY = event.clientY;
                }
                if(mode_y == 1)
                {
                    let dragX = event.clientX;
                    let dragY = event.clientY;

                    let temp = Math.atan2(dragY-mouseY,dragX-mouseX);

                    if((-90 < (temp*180/Math.PI)) && ((temp*180/Math.PI) < 90))
                    {
                        theta = theta+1;
                        //console.log("right");
                        //console.log(temp*180/Math.PI)
                    }
                    else
                    {
                        theta = theta-1;
                        //console.log("left");
                        //console.log(temp*180/Math.PI);
                    }
                    //console.log(dragY)
                    let viewMatrix = mat4.create();
                    mat4.lookAt(viewMatrix, vec3.fromValues((1*Math.cos(theta)+1*Math.sin(theta)),0.5,(-1*Math.sin(theta)+1*Math.cos(theta))), vec3.fromValues(0, 0, -1), vec3.fromValues(0, 1, 0));
                    x_axis.transform.setviewMatrix(viewMatrix);
                    x_axis.transform.updateMVPMatrix();
                    y_axis.transform.setviewMatrix(viewMatrix);
                    y_axis.transform.updateMVPMatrix();
                    z_axis.transform.setviewMatrix(viewMatrix);
                    z_axis.transform.updateMVPMatrix();
                    diamond.transform.setviewMatrix(viewMatrix);
                    diamond.transform.updateMVPMatrix();
                    cube.transform.setviewMatrix(viewMatrix);
                    cube.transform.updateMVPMatrix();
                    teapot.transform.setviewMatrix(viewMatrix);
                    teapot.transform.updateMVPMatrix();
                    cone_base.transform.setviewMatrix(viewMatrix);
                    cone_base.transform.updateMVPMatrix();
                    cone_top.transform.setviewMatrix(viewMatrix);
                    cone_top.transform.updateMVPMatrix();
                    mouseX = event.clientX;
                    mouseY = event.clientY;
                }
                if(mode_z == 1)
                {
                    let dragX = event.clientX;
                    let dragY = event.clientY;

                    let temp = Math.atan2(dragY-mouseY,dragX-mouseX);

                    if((-90 < (temp*180/Math.PI)) && ((temp*180/Math.PI) < 90))
                    {
                        theta = theta+1;
                        //console.log("right");
                        //console.log(temp*180/Math.PI)
                    }
                    else
                    {
                        theta = theta-1;
                        //console.log("left");
                        //console.log(temp*180/Math.PI);
                    }
                    //console.log(dragY)
                    let viewMatrix = mat4.create();
                    mat4.lookAt(viewMatrix, vec3.fromValues((1*Math.cos(theta)+0.5*Math.sin(theta)),(-1*Math.sin(theta)+0.5*Math.cos(theta)),1), vec3.fromValues(0, 0, -1), vec3.fromValues(0, 1, 0));
                    x_axis.transform.setviewMatrix(viewMatrix);
                    x_axis.transform.updateMVPMatrix();
                    y_axis.transform.setviewMatrix(viewMatrix);
                    y_axis.transform.updateMVPMatrix();
                    z_axis.transform.setviewMatrix(viewMatrix);
                    z_axis.transform.updateMVPMatrix();
                    diamond.transform.setviewMatrix(viewMatrix);
                    diamond.transform.updateMVPMatrix();
                    cube.transform.setviewMatrix(viewMatrix);
                    cube.transform.updateMVPMatrix();
                    teapot.transform.setviewMatrix(viewMatrix);
                    teapot.transform.updateMVPMatrix();
                    cone_base.transform.setviewMatrix(viewMatrix);
                    cone_base.transform.updateMVPMatrix();
                    cone_top.transform.setviewMatrix(viewMatrix);
                    cone_top.transform.updateMVPMatrix();
                    mouseX = event.clientX;
                    mouseY = event.clientY;
                }
            }
        }
    });
    renderer.getcanvas().addEventListener("mouseup", function(event){
        if(mode == 1)
        {
           userinteracting = false;
           theta = 0;
        }
    });

    function animate() 
    {
        renderer.clear();
        x_axis.draw(shader);
        y_axis.draw(shader);
        z_axis.draw(shader);
        diamond.draw(shader);
        cube.draw(shader);
        teapot.draw(shader);
        cone_base.draw(shader);
        cone_top.draw(shader);
        window.requestAnimationFrame(animate);
    }

    animate();
    shader.delete();

}