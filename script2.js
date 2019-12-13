import * as THREE from './vendor/three.js-master/build/three.module.js';
import {OrbitControls} from './vendor/three.js-master/examples/jsm/controls/OrbitControls.js';
import {loadBottomTiles, loadMiddleTiles, loadTopTiles} from "./loader.js";

const Scene = {
    vars: {
        container: null,
        scene: null,
        renderer: null,
        camera: null,
        light: null,
        stats: null,
        controls: null,
        mouse: new THREE.Vector2(),
        raycaster: new THREE.Raycaster(),
        tiles: [],
    },
    animate: () => {
        Scene.render();
        requestAnimationFrame(Scene.animate);
    },
    render: () => {
        Scene.vars.renderer.render(Scene.vars.scene, Scene.vars.camera);
    },
    onWindowResize: () => {
        Scene.vars.camera.aspect = window.innerWidth / window.innerHeight;
        Scene.vars.camera.updateProjectionMatrix();
        Scene.vars.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onMouseClick: (event) => {
        event.preventDefault();
        Scene.vars.mouse.x = (event.clientX / Scene.vars.renderer.domElement.clientWidth) * 2 - 1;
        Scene.vars.mouse.y = -(event.clientY / Scene.vars.renderer.domElement.clientHeight) * 2 + 1;
        Scene.vars.raycaster.setFromCamera(Scene.vars.mouse, Scene.vars.camera);
        let intersects = Scene.vars.raycaster.intersectObjects(Scene.vars.tiles);
        if (intersects.length > 0) intersects[0].object.callback();
    },
    init: () => {
        let vars = Scene.vars;
        vars.container = document.createElement('div');
        vars.container.classList.add("fullscreen");
        document.body.appendChild(vars.container);

        vars.scene = new THREE.Scene();
        vars.scene.background = new THREE.Color(0xeaebe8);

        vars.renderer = new THREE.WebGLRenderer({antialias: true});
        vars.renderer.setPixelRatio(window.devicePixelRatio);
        vars.renderer.setSize(window.innerWidth, window.innerHeight);
        vars.renderer.shadowMap.enabled = true;
        vars.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        vars.container.appendChild(vars.renderer.domElement);

        vars.tl = new THREE.PointLight(0xFFFFFF, 1);
        vars.sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 100, 100), new THREE.MeshPhongMaterial({
            color: new THREE.Color(0x444444),
            side: THREE.DoubleSide
        }));
        vars.sphere.receiveShadow = true;
        vars.sphere.add(vars.tl);
        vars.scene.add(vars.sphere);

        vars.camera = new THREE.PerspectiveCamera(45, window.innerWidth /
            window.innerHeight, 1, 2000);
        vars.camera.position.set(0, 30, 45);

        let rightSpot = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        rightSpot.position.set(50, 50, 50);
        rightSpot.castShadow = true;
        rightSpot.shadow.camera.left = -50;
        rightSpot.shadow.camera.top = 50;
        rightSpot.shadow.camera.bottom = -50;
        rightSpot.shadow.camera.right = 50;
        rightSpot.shadow.camera.far = 300;
        rightSpot.shadow.mapSize.width = 2048;
        rightSpot.shadow.mapSize.height = 2048;
        vars.scene.add(rightSpot);
        let leftSpot = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        leftSpot.position.set(-50, 50, 50);
        leftSpot.castShadow = true;
        leftSpot.shadow.camera.left = -50;
        leftSpot.shadow.camera.top = 50;
        leftSpot.shadow.camera.bottom = -50;
        leftSpot.shadow.camera.right = 50;
        leftSpot.shadow.camera.far = 300;
        leftSpot.shadow.mapSize.width = 2048;
        leftSpot.shadow.mapSize.height = 2048;
        vars.scene.add(leftSpot);

        Scene.vars.plateau = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200, 10), new THREE.MeshBasicMaterial({color: 0xcccccc}));
        Scene.vars.plateau.receiveShadow = false;
        Scene.vars.plateau.rotation.x = -Math.PI / 2;
        Scene.vars.scene.add(Scene.vars.plateau);

        Scene.vars.shadowplane = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200, 10), new THREE.ShadowMaterial({opacity: 0.07}));
        Scene.vars.shadowplane.receiveShadow = true;
        Scene.vars.shadowplane.rotation.x = -Math.PI / 2;
        Scene.vars.scene.add(Scene.vars.shadowplane);

        window.addEventListener('resize', Scene.onWindowResize, false);
        window.addEventListener('mousedown', Scene.onMouseClick, false);
        vars.controls = new OrbitControls(vars.camera, vars.renderer.domElement);
        vars.controls.maxDistance = 80;
        vars.controls.minDistance = 40;
        vars.controls.minPolarAngle = Math.PI / 4;
        vars.controls.maxPolarAngle = Math.PI / 2 - Math.PI / 24;
        vars.controls.minAzimuthAngle = -Math.PI / 4;
        vars.controls.maxAzimuthAngle = Math.PI / 4;
        vars.controls.update();
        Scene.load();
    },
    load: () => {
        loadTopTiles(Scene).then(() => {
            loadBottomTiles(Scene).then(() => {
                loadMiddleTiles(Scene).then(() => {
                    Scene.finishLoading();
                });
            });
        });
    },
    finishLoading: () => {
        Scene.animate();
        document.getElementById('loading').remove();
    }
};

Scene.init();
