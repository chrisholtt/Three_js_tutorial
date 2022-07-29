import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loader
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('textures/normal-map.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusKnotGeometry(9, 4, 139, 11, 2, 3);
const geometry = new THREE.TorusKnotGeometry(8.55, 3.7917, 139, 11, 2, 3);


// Materials
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0x000000);
material.roughness = 0.15;
material.metalness = 0.75;
// material.transparent = true;
// material.opacity = 0.6;
material.normalMap = normalTexture
// material.wireframe = true;

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 5)
pointLight.position.set(2, 5, 40)
scene.add(pointLight)

// red light
const pointLight2 = new THREE.PointLight(0xff0000, 20)
pointLight2.position.set(-10, 10, 21)
scene.add(pointLight2)

const light2 = gui.addFolder('light2')
light2.add(pointLight2.position, 'y').min(-10).max(10)
light2.add(pointLight2.position, 'x').min(-10).max(10)
light2.add(pointLight2.position, 'z').min(-100).max(100)
light2.add(pointLight2, 'intensity').min(0).max(100)
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper2)

// blue light
const pointLight3 = new THREE.PointLight(0x0000ff, 20)
pointLight3.position.set(10, -10, 21)
scene.add(pointLight3)

const light3 = gui.addFolder('light3')
light3.add(pointLight3.position, 'y').min(-10).max(10)
light3.add(pointLight3.position, 'x').min(-10).max(10)
light3.add(pointLight3.position, 'z').min(-100).max(100)
light3.add(pointLight3, 'intensity').min(0).max(100)
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLightHelper3)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 30
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const moveSphere = (event) => {
    sphere.position.y = window.scrollY * .02
}

document.addEventListener('mousemove', onDocumentMouseMove)
document.addEventListener('scroll', moveSphere)


const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.2 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += 12 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()