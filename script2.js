import * as THREE from './vendor/three.js-master/build/three.module.js';
import {OrbitControls} from './vendor/three.js-master/examples/jsm/controls/OrbitControls.js';
import {addTile} from "./loader.js";

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
        intersects.forEach(({object}) => {
            object.callback();
        });
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
        vars.camera.position.set(0, 20, 50);

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

        Scene.vars.plateau = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200, 10), new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
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
        vars.controls.maxDistance = 100;
        vars.controls.minDistance = 10;
        vars.controls.minPolarAngle = Math.PI / 4;
        vars.controls.maxPolarAngle = Math.PI / 2 - Math.PI / 24;
        vars.controls.minAzimuthAngle = -Math.PI / 4;
        vars.controls.maxAzimuthAngle = Math.PI / 4;
        vars.controls.update();
        Scene.load();
    },
    load: () => {
        addTile(0x00ff00, -15, 0, 0, Scene.vars.scene, 'do', Scene.vars.camera, Scene.vars.tiles).then(() => {
            addTile(0x00ffff, -10, 0, 0, Scene.vars.scene, 're', Scene.vars.camera, Scene.vars.tiles).then(() => {
                addTile(0xffff00, -5, 0, 0, Scene.vars.scene, 'mi', Scene.vars.camera, Scene.vars.tiles).then(() => {
                    addTile(0x00faff, 0, 0, 0, Scene.vars.scene, 'fa', Scene.vars.camera, Scene.vars.tiles).then(() => {
                        addTile(0x000000, 5, 0, 0, Scene.vars.scene, 'sol', Scene.vars.camera, Scene.vars.tiles).then(() => {
                            addTile(0x00aa00, 10, 0, 0, Scene.vars.scene, 'la', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                addTile(0x00f000, 15, 0, 0, Scene.vars.scene, 'si', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                    Scene.finishLoading();
                                });
                            });
                        });
                    });
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
