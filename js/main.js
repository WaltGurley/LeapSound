//variables for THREE.js
var visContainer = d3.select(".vis-container"),
  visWidth = parseInt(visContainer.style("width")),
  visHeight = parseInt(visContainer.style("height")),
  camera,
  renderer,
  scene,
  sceneSize = 100;

//variables for leap.js
var controller,
  frame;

var handsMesh = [];

setupVis();

render();

function setupVis() {

  controller = new Leap.Controller();

  scene = new THREE.Scene();

  //input vars = (FOV, aspect ratio, near clipping plane, far clipping plane)
  camera = new THREE.PerspectiveCamera(
    75,
    visWidth / visHeight,
    sceneSize / 100,
    sceneSize * 4
  );

  camera.position.z = sceneSize;

  renderer = new THREE.WebGLRenderer();
  //renderer.setSize(visWidth, visHeight);
  visContainer.node().appendChild(renderer.domElement);

  setupHands();

  function setupHands() {

    for (i = 0; i < 2; i++) {
      var geometry = new THREE.BoxGeometry(20, 20, 20);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      handsMesh.push(cube);
    }

  }

  controller.connect();

}

function render() {

  frame = controller.frame();
  //console.log(frame)
	renderer.render(scene, camera);

  requestAnimationFrame(render);
}
