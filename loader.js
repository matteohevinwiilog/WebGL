import * as THREE from './vendor/three.js-master/build/three.module.js';

export function addTile(color, px, py, pz, scene, name, camera, tiles) {
    return new Promise((resolve, reject) => {
        let listener = new THREE.AudioListener();
        camera.add(listener);
        let sound = new THREE.Audio(listener);
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'res/' + name + '.wav', function( buffer ) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            let geometry = new THREE.BoxGeometry(5, 2, 15);
            let material = new THREE.MeshBasicMaterial({color: color});
            let cube = new THREE.Mesh(geometry, material);
            cube.castShadow = true;
            cube.position.x = px;
            cube.position.y = py;
            cube.position.z = pz;
            cube.name = name;
            cube.callback = function() {
                if (!sound.isPlaying) {
                    sound.play();
                    setTimeout(() => {
                        sound.stop();
                    }, sound.buffer.duration * 1000);
                }
            };
            scene.add(cube);
            tiles.push(cube);
            resolve();
        });

    });
}
