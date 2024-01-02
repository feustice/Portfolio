import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load('road.jpg'); // Replace with your background image

// Create a camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 0);

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soften the shadows

// Create a directional light for shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 9);
directionalLight.position.set(7.5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
scene.add(directionalLight);

// Function to load a GLB model and adjust its position and scale
const loadModel = (modelPath, position, scale) => {
  const loader = new GLTFLoader();
  loader.load(modelPath, (gltf) => {
    const loadedModel = gltf.scene;
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    loadedModel.position.copy(position);
    loadedModel.scale.set(scale, scale, scale);
    scene.add(loadedModel);
  });
};

// Load the initial car model with a scale of 1.0

const symbol = loadModel('Cross2.glb', new THREE.Vector3(0, -0.25, 2), 4);
// Load the house model
const house = loadModel('dutsun.glb', new THREE.Vector3(2.04, 2.05, -2.25), 0.25);
const road = loadModel('raceroad.glb', new THREE.Vector3(0,0,-4), 10);
const land = loadModel('laptop.glb', new THREE.Vector3(0.4,-0.5,-0.75), 0.75);
const hockeyStick = loadModel('hockey.glb', new THREE.Vector3(-0.35, -0.5, -0.25), 1);
const kamera = loadModel('camera.glb', new THREE.Vector3(0.35, -0.48, 0.25), 0.6);
const books = loadModel('books.glb', new THREE.Vector3(-0.35, -0.5, 0.8), 1);


//texts
const oneYear = loadModel('2008.glb', new THREE.Vector3(-0.85, -0.6, -1.2), 1);
const secYear = loadModel('2020.glb', new THREE.Vector3(0.8 ,-0.6,-0.5), 0.8);
const thrYear = loadModel('2015.glb', new THREE.Vector3(-0.85, -0.6, -0.05), 0.68);
const forYear = loadModel('2023.glb', new THREE.Vector3(0.8 ,-0.6,0.55), 0.8);
const fifYear = loadModel('2021.glb', new THREE.Vector3(-0.85, -0.6, 0.82), 0.68);


// Create controls
const controls = new OrbitControls(camera, renderer.domElement);

// Function to move the camera based on scroll
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.0005; // Adjust the speed and direction of movement here
};

// Scroll event listener
document.body.onscroll = moveCamera;

// Animate the scene
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  moveCamera(); // Update camera position on every frame
  renderer.render(scene, camera);
};

animate();
