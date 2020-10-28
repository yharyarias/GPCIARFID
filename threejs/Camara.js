/**
 * Seminario GPC #3. Camara
 * Manejar diferentes camaras, marcos y picking
 */


// Variables 
var renderer, scene, camera;

// Variables globales
var esferacubo, cubo, angulo = 0;
var l = b = 4;
var r = t = -l;

// Acciones
init();
loadScene();
render();

function init(){
    // Crear el motor, la escena y la camara

    // Motor de render
    render = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x0000AA));
    document.getElementById('container').appendChild(renderer.domElement);

    // Escena
    scene = new THREE.Scene();

    // Camara
    var ar = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(50, ar, 0.1, 100);
    // camera = new THREE.OrthographicCamera(l, r, t, b, -20, 20);
    screen.add(camera);
    camera.position.set(0.5, 3, 9);
    camera.lookAt(new THREE.Vector3(0,0,0));

    // Captura de enventos
    window.addEventListener('resize', updateAspectRatio);
}

function loadScene(){
    // Cargar la escena con objetos

    // Materiales

}

function updateAspectRatio(argument){
    // Renueva la relación de aspecto de la camara

    // Ajustar el tamaño del canvas
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Razón de aspecto
    var ar = window.innerWidth/innerHeight;

    /* Camara ortografica
    if(ar > 1){
        camera.left = -4*ar;
        camera.right = 4*ar;
        camera.botttom = -4;
        camera.top = 4;
    }
    else {
        camera.top = 4/ar;
        camera.botttom = -4/ar;
        camera.left = -4;
        camera.right = 4;
    }
    
    camera.updateProjectionMatrix();
}
*/

    // Camara perpectiva
    camera.aspect = ar;
    camera.updateProjectionMatrix();
}
function update(){
    // Cambios entre frames
}


function render(){
    // Dibujar cada frame
    requestAnimationFrame(render);

    update();

    renderer.render(scene, camera);
}