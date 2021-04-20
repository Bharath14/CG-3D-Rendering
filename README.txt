To start the application run the npm-start command at the location of index.html.

While the Screen is rendered we see an X Y Z axes of colour Red, Green and Blue Respectively.
I Rendered four objects Teapot in Purple Color, Diamond in Yellow Color, Cube in Blue color and a Cone.

Now to perform operations on this Scene follow these keyboard and mouse commands.

"d" - Translates teapot, diamond, and cube to three endpoints of a triangle whose centre is origin.
"e" - Translates teapot, diamond, cube to midpoints of above triangle.
"f" - Rotates the teapot along X-axis, Diamond Along Y-axis and Cube along Z-axis.
"g" - Scales Teapot by 0.5, Diamond by 2, and Cube by 3.
"h"- Enters into picking mode.
    "o" - picks the object. Click on the object using mouse left click and the object picked will turn black color.
    "p" - picks the face. Implemented only for Cone. Picks the face of the cone which is clicked using mouse.
"i" - Enters into camera rotating mode.
    "x" - Rotates along X-axis by dragging the mouse left and right.
    "y" - Rotates along Y-axis by dragging the mouse left and right.
    "z" - Rotates along Z-axis by dragging the mouse left and right.
"r" - Resets camera position to original ,scalling of each object to original, and rotation angle to original for each object.