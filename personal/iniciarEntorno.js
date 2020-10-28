var renderer, scene, camera;
var vaso = [];
var sphere;
var angulo = 0;
var clk = new THREE.Clock(false);
var cual = 0;

function main() {

    var aspectRatio = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(90, aspectRatio, 1, 500);
    camera.position.set(0, 20, 20);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xAAAAAA, 0.1);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000001));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap


    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);

    document.getElementById('container').appendChild(renderer.domElement);
    window.addEventListener('resize', updateAspectRatio);
}

function updateAspectRatio() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}


function render() {       
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

function cargarPiso() {
    var texture = new THREE.TextureLoader().load('images/wood512.jpg');
    var groundMaterial = new THREE.MeshPhongMaterial({
        map: texture
    });
    plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 50), groundMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;

    scene.add(plane);
}

function cargarLuz() {
    var light = new THREE.PointLight(0xAAAAAA, 5, 70, 1);
    light.position.set(0, 40, 0);
    light.castShadow = true;
    light.shadowMapWidth = 512;
    light.shadowMapHeight = 512;
    light.shadowCameraFar = 1000;
    light.shadowDarkness = 0.2;
    scene.add(light);

}


function cargarVasos() {

    var geometry = new THREE.CylinderGeometry(3.7, 5.9, 10, 15);

    //vaso.push(new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xAE0000 })));
    vaso.push(new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xAE0000 })));
    vaso.push(new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xAE0000 })));
    vaso.push(new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xAE0000 })));

    vaso[0].position.set(15, 5.1, 0);
    vaso[0].rotation.x = 0;
    vaso[0].castShadow = true;
    vaso[0].recieveShadow = true;
    vaso[1].position.set(0, 5.1, 0);
    vaso[1].rotation.x = 0;
    vaso[1].castShadow = true;
    vaso[1].recieveShadow = true;
    vaso[2].position.set(-15, 5.1, 0);
    vaso[2].rotation.x = 0;
    vaso[2].castShadow = true;
    vaso[2].recieveShadow = true;

    for (var i = 0; i < vaso.length; i++) {
        scene.add(vaso[i]);
    }

}

function cargarBolita() {
    var geometry = new THREE.SphereGeometry(2, 32, 32);
    var material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.5, roughness: 0 });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(15, 2, 15);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    scene.add(sphere);
}

function update() {
    cameraControls.update();

    if (clk.running) {
        vaso[0].position.x = -20 * Math.sin(7 * toRadians(angulo));
        vaso[0].position.z = -5 * Math.sin(10 * toRadians(angulo));
        vaso[1].position.x = 20 * Math.sin(7 * toRadians(angulo));
        vaso[1].position.z = -5 * Math.sin(9 * toRadians(angulo));
        vaso[2].position.x = 20 * Math.sin(6 * toRadians(angulo));
        vaso[2].position.z = -5 * Math.sin(11 * toRadians(angulo));
        bolaDentro();
        angulo = (angulo + 1) % 360;

        clk.getDelta();

        if (clk.elapsedTime > 2.5) {
            clk.stop();
            const button = document.getElementById('botonEmpezar');
            button.disabled=false;
        }
    }

    for (let i = 0; i < vaso.length; i++) {

    }
}

function toRadians(angulo) {
    return angulo * (Math.PI / 180);
}

function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}


function start() {
    const button = document.getElementById('botonEmpezar');
    button.disabled=true;
    cual = getRandomArbitrary(0, 3);
    bolaDentro();
    openVaso(0); 
}

function openVaso(profundidad) {
    if (profundidad < 5) {
        setTimeout(()=>{
            vaso[cual].position.y += 2;
            vaso[cual].rotation.y += Math.PI / 10;
            openVaso(profundidad+1);
        },50);
    }
    else {
        closeVaso(0);
        return;
    }
}

function closeVaso(profundidad) {
    if (profundidad < 5) {
        setTimeout(()=>{
            vaso[cual].position.y -= 2;
            vaso[cual].rotation.y -= Math.PI / 10;
            closeVaso(profundidad+1);
        },50)
    }
    else {
        setTimeout(clk.start(),5000); 
        return;
    }
}

function bolaDentro(){
    sphere.position.x = vaso[cual].position.x;
    sphere.position.y = 0;
    sphere.position.z = vaso[cual].position.z;
}


main();
cargarPiso();
cargarLuz();
cargarVasos();
cargarBolita();
render();