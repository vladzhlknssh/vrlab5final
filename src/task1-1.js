import './style.css'

import * as THREE from "three"
import { ARButton } from "three/addons/webxr/ARButton.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let camera, scene, renderer;
let coneMesh, tetrahedronMesh, ringMesh; 
let controls;

init();
animate();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Сцена
    scene = new THREE.Scene();

    // Камера
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

    // Об'єкт рендерингу
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
            
    renderer.xr.enabled = true; // Життєво важливий рядок коду для вашого застосунку!
    container.appendChild(renderer.domElement);
            
    // Світло
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4); 
    directionalLight.position.set(3, 3, 3);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 10, 10); 
    pointLight.position.set(-2, 2, 2);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); 
    scene.add(ambientLight);
    
    // 1. Створюємо об'єкт конуса
    const coneGeometry = new THREE.ConeGeometry(0.4, 0.5);
    // Матеріал для першого об'єкту 
    const coneMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        emissive: 0x00ffcc,
        emissiveIntensity: 2.0,
        metalness: 0.7,
        roughness: 0.3,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
    });

    // Створюємо меш
    coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
    coneMesh.position.x = -1.5;
    scene.add(coneMesh);

    // 2. Створюємо об'єкт тетраедру
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.4);
    // Матеріал для другого
    const tetrahedronMaterial = new THREE.MeshStandardMaterial({
        сolor: 0x8a2be2, 
        emissive: 0x4b0082, 
        emissiveIntensity: 1.2,
        metalness: 0.8,
        roughness: 0.05,
        transparent: true,
        opacity: 0.7,
        envMapIntensity: 1.5, 
    });

    // Створюємо наступний меш
    tetrahedronMesh = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
    scene.add(tetrahedronMesh);

    // 3. Створюємо об'єкт кільця
    const ringGeometry = new THREE.RingGeometry(0.3, 0.5, 8);
    // Матеріал для третього
        const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF7F50, 
        emissive: 0xFF7F50,
        emissiveIntensity: 2.5,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: true, 
});


    // Створюємо наступний меш
    ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.x = 1.5;
    scene.add(ringMesh);
    
    // Позиція для камери
    camera.position.z = 3;

    // Контролери для 360 огляду на вебсторінці, але не під час AR-сеансу
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    document.body.appendChild(ARButton.createButton(renderer));

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
    controls.update();
}

function render() {
    rotateObjects();
    renderer.render(scene, camera);
}
    
function rotateObjects() {
    coneMesh.rotation.y = coneMesh.rotation.y - 0.001;
    tetrahedronMesh.rotation.x = tetrahedronMesh.rotation.x - 0.01;
    ringMesh.rotation.x = ringMesh.rotation.x + 0.01;
}