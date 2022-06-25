import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Matrix3, Scene, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector('#bg'),
}); 
//
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); //check this later
camera.position.setX(-3);

var loadingManager = null ; 
var loadingScreen = { 
  scene:new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(90 , 1280/720 , 0.1, 100),
  box :new THREE.Mesh(
    new THREE.BoxGeometry(0.5 , 0.5 , 0.5),
    new THREE.MeshBasicMaterial({color:0x4444ff})
  )
};
var RESOURCES_LOADED = false ; 

loadingScreen.box.position.set(0,0,5);
loadingScreen.camera.lookAt(loadingScreen.box.position);
loadingScreen.scene.add(loadingScreen.box);

loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = function(item, loaded , total){ 
  console.log(item, loaded,total);
};
loadingManager.onLoad = function(){ 
  RESOURCES_LOADED = true;
}

renderer.render(scene , camera);

const geometry = new THREE.TorusGeometry(10 ,3 , 16 ,100); //check this later
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

//scene.add(torus);
const loader = new GLTFLoader();
loader.load('../avatar.glb', function(gltf){ 
  gltf.scene.scale.set(5,5,5);
  gltf.scene.position.set(0,-1,0);
  scene.add(gltf.scene);

});


const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(40, 40 ,150 );

const pointLight2 = new THREE.PointLight(0xFFFFFF);
pointLight2.position.set(20 , 5 , 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight , pointLight2);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){ 
  const geometry = new THREE.SphereGeometry(0.25 , 24 ,24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry , material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x , y ,z);
  scene.add(star);
}

//Array(50).fill().forEach(addStar); //check this later


const earthTexture = new THREE.TextureLoader(loadingManager).load('images/TM/earthTM2.jpg');
const mercuryTexture = new THREE.TextureLoader(loadingManager).load('images/TM/mercuryTM.jpg');
const venusTexture = new THREE.TextureLoader(loadingManager).load('images/TM/venusTM.jpg');
const marsTexture  = new THREE.TextureLoader(loadingManager).load('images/TM/marsTM.jpg');
const jupiterTexture = new THREE.TextureLoader(loadingManager).load('images/TM/jupiterTM.jpg');
const saturnTexture = new THREE.TextureLoader(loadingManager).load('images/TM/saturnTM.jpg');
// const UranusTexture
// const neptuneTexture

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2.7,12,12),
  new THREE.MeshStandardMaterial({ 
    map: mercuryTexture
  })
)
scene.add(mercury);
mercury.position.z =15;
mercury.position.setX(-10);
mercury.rotation.z = -100;

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ 
    map: venusTexture
  })
)
scene.add(venus);
venus.position.z =35;
venus.position.setX(-10);
venus.rotation.z = 0;


const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ 
    map: earthTexture
  })
)
scene.add(earth);
earth.position.z =65;
earth.position.setX(-10);
earth.rotation.x = -13;


const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2.8,30,30),
  new THREE.MeshStandardMaterial({ 
    map: marsTexture
  })
)
scene.add(mars);
mars.position.z =85;
mars.position.setX(-10);
mars.rotation.z = -13;


const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(7,110,110),
  new THREE.MeshStandardMaterial({ 
    map: jupiterTexture
  })
)
scene.add(jupiter);
jupiter.position.z =115;
jupiter.position.setX(-10);
jupiter.rotation.z = -25;

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(4,110,110),
  new THREE.MeshStandardMaterial({ 
    map: saturnTexture
  })
)
scene.add(saturn);
saturn.position.z =150;
saturn.position.setX(-20);
//saturn.rotation.y = 0 ;
saturn.rotateOnAxis(new Vector3(0,1,0) , true);


  const texture = new THREE.TextureLoader().load(
    "https://i.postimg.cc/zz7Gr430/saturn-rings-top.png"
  );
  const geometryNew = new THREE.RingBufferGeometry(3, 20, 40);
  var pos = geometryNew.attributes.position;
  var v3 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    geometryNew.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
  }
  // adjustRingGeometry(geometry);

  const materialNew = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x3d3c3a,
    side: THREE.DoubleSide,
    transparent: true
  });
  const rings = new THREE.Mesh(geometryNew, materialNew);
  scene.add(rings);
  rings.position.z = 150 ;
  rings.position.setX(-20);
  rings.rotation.x = 4.5;
  rings.rotation.y = 0.7;


const spaceTexture =  new THREE.TextureLoader().load('17520.webp');
scene.background = spaceTexture;


function moveCamera(){ 
  const setC  = document.body.getBoundingClientRect().top;


  camera.position.z = setC * -0.01;
  camera.position.y = setC *-0.0002;
  camera.position.x = setC *-0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){ 

  if( RESOURCES_LOADED == false ){
		requestAnimationFrame(animate);
		
		loadingScreen.box.position.x -= 0.05;
		if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
		loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
		
		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}

  requestAnimationFrame(animate);

  mercury.rotation.y +=0.001;
  venus.rotation.y -=0.0005;
  earth.rotation.y +=0.03
  mars.rotation.y +=0.022;
  jupiter.rotation.y +=0.1;
  //saturn.rotation.y +=0.09;
  //rings.rotation.z -=0.1;
  controls.update();

  renderer.render(scene, camera);
}
animate();
