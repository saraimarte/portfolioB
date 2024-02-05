import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'



//SECTION - Canvas
const canvas = document.querySelector('canvas.webgl')

//SECTION - Scene
const scene = new THREE.Scene()

//SECTION - Loaders

// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()

/*
// GLTF loader
gltfLoader.setDRACOLoader(dracoLoader)


 * Object

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

scene.add(cube)
 */


const bakedTexture = textureLoader.load('cube.png')
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
const bakedMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
gltfLoader.load(
    '../../public/girl.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial2
        })



        scene.add(gltf.scene)

    }
)

//SECTION - Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

//SECTION - Camera

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
camera.position.y = 10;
scene.add(camera)
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

/*
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)
*/
//SECTION - Controls
// Create the OrbitControls with the camera and canvas
const controls = new OrbitControls(camera, canvas);

// Set the desired restrictions on rotation
controls.minPolarAngle = 1; // Minimum angle in radians (0 means no restriction)
controls.maxPolarAngle = 0; // Maximum angle in radians (0 means no restriction)

// Disable zooming
controls.enableZoom = false;

// Enable damping for smooth animations
controls.enableDamping = true;

// Enable rotation
controls.enableRotate = true;

// ... (rest of your code)

//SECTION - Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//SECTION - Animate

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick() 