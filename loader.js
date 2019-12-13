import * as THREE from './vendor/three.js-master/build/three.module.js';

export function addTile(color, px, py, pz, scene, name, camera, tiles, width = 3, depth = 15) {
    return new Promise((resolve) => {
        let listener = new THREE.AudioListener();
        camera.add(listener);
        let sound = new THREE.Audio(listener);
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'res/' + name + '.mp3', function( buffer ) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            let geometry = new THREE.BoxGeometry(width, 2, depth);
            let material = new THREE.MeshBasicMaterial({color: color});
            let cube = new THREE.Mesh(geometry, material);
            let edges = new THREE.EdgesGeometry(geometry);
            let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x000000}));
            cube.castShadow = true;
            cube.position.x = px;
            cube.position.y = py;
            cube.position.z = pz;
            line.position.x = px;
            line.position.y = py;
            line.position.z = pz;
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
            scene.add(line);
            tiles.push(cube);
            resolve();
        });
    });
}

export function loadTopTiles(Scene) {
    return new Promise((resolve) => {
        addTile(0xffffff, -30, 0, 0, Scene.vars.scene,'note1s', Scene.vars.camera, Scene.vars.tiles).then(() => {
            addTile(0xffffff, -27, 0, 0, Scene.vars.scene, 'note3s', Scene.vars.camera, Scene.vars.tiles).then(() => {
                addTile(0xffffff, -24, 0, 0, Scene.vars.scene,  'note5s', Scene.vars.camera, Scene.vars.tiles).then(() => {
                    addTile(0xffffff, -21, 0, 0, Scene.vars.scene,  'note6s', Scene.vars.camera, Scene.vars.tiles).then(() => {
                        addTile(0xffffff, -18, 0, 0, Scene.vars.scene,  'note8s', Scene.vars.camera, Scene.vars.tiles).then(() => {
                            addTile(0xffffff, -15, 0, 0, Scene.vars.scene,  'note10s', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                addTile(0xffffff, -12, 0, 0, Scene.vars.scene,  'note12s', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                    addTile(0xffffff, -9, 0, 0, Scene.vars.scene,  'note1o', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                        addTile(0xffffff, -6, 0, 0, Scene.vars.scene,  'note3o', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                            addTile(0xffffff, -3, 0, 0, Scene.vars.scene,  'note5o', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                                addTile(0x000000, -28.5, 1, -2, Scene.vars.scene,  'note2s', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                    addTile(0x000000, -25.5, 1, -2, Scene.vars.scene,  'note4s', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                        addTile(0x000000, -19.5, 1, -2, Scene.vars.scene,  'note7s', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                            addTile(0x000000, -16.5, 1, -2, Scene.vars.scene,  'note9s', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                addTile(0x000000, -13.5, 1, -2, Scene.vars.scene,  'note11s', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                    addTile(0x000000, -7.5, 1, -2, Scene.vars.scene,  'note2o', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                        addTile(0x000000, -4.5, 1, -2, Scene.vars.scene,  'note4o', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                            resolve();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
export function loadBottomTiles(Scene) {
    return new Promise((resolve) => {
        addTile(0xffffff, 3, 0, 0, Scene.vars.scene,  'note8o', Scene.vars.camera, Scene.vars.tiles).then(() => {
            addTile(0xffffff, 6, 0, 0, Scene.vars.scene,  'note10o', Scene.vars.camera, Scene.vars.tiles).then(() => {
                addTile(0xffffff, 9, 0, 0, Scene.vars.scene,  'note12o', Scene.vars.camera, Scene.vars.tiles).then(() => {
                    addTile(0xffffff, 12, 0, 0, Scene.vars.scene,  'note1t', Scene.vars.camera, Scene.vars.tiles).then(() => {
                        addTile(0xffffff, 15, 0, 0, Scene.vars.scene,  'note3t', Scene.vars.camera, Scene.vars.tiles).then(() => {
                            addTile(0xffffff, 18, 0, 0, Scene.vars.scene,  'note5t', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                addTile(0xffffff, 21, 0, 0, Scene.vars.scene,  'note6t', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                    addTile(0xffffff, 24, 0, 0, Scene.vars.scene,  'note8t', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                        addTile(0xffffff, 27, 0, 0, Scene.vars.scene,  'note10t', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                            addTile(0xffffff, 30, 0, 0, Scene.vars.scene,  'note12t', Scene.vars.camera, Scene.vars.tiles).then(() => {
                                                addTile(0x000000, 4.5, 1, -2, Scene.vars.scene,  'note9o', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                    addTile(0x000000, 7.5, 1, -2, Scene.vars.scene,  'note11o', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                        addTile(0x000000, 13.5, 1, -2, Scene.vars.scene,  'note2t', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                            addTile(0x000000, 16.5, 1, -2, Scene.vars.scene,  'note4t', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                addTile(0x000000, 22.5, 1, -2, Scene.vars.scene,  'note7t', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                    addTile(0x000000, 25.5, 1, -2, Scene.vars.scene,  'note9t', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                        addTile(0x000000, 28.5, 1, -2, Scene.vars.scene,  'note11t', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                                                                            resolve();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

export function loadMiddleTiles(Scene) {
    return new Promise((resolve) => {
        addTile(0xffffff, 0, 0, 0, Scene.vars.scene,  'note6o', Scene.vars.camera, Scene.vars.tiles).then(() => {
            addTile(0x000000, 1.5, 1, -2, Scene.vars.scene,  'note7o', Scene.vars.camera, Scene.vars.tiles, 2, 11).then(() => {
                resolve();
            });
        });
    });
}


