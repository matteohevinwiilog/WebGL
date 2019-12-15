import * as THREE from './vendor/three.js-master/build/three.module.js';

export function addTile(color, px, py, pz, scene, name, width = 3, depth = 15, height = 2) {
    return new Promise((resolve) => {
        let listener = new THREE.AudioListener();
        scene.vars.camera.add(listener);
        let sound = new THREE.Audio(listener);
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load('res/' + name + '.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            let geometry = new THREE.BoxGeometry(width, height, depth);
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
            cube.callback = function (length = null, force = false) {
                return new Promise(resolve => {
                    if (!sound.isPlaying && (!scene.vars.isPlaying || force)) {
                        cube.position.y -= 0.8;
                        line.position.y -= 0.8;
                        sound.play();
                        setTimeout(() => {
                            sound.stop();
                            cube.position.y += 0.8;
                            line.position.y += 0.8;
                            resolve();
                        }, length ? length : (sound.buffer.duration * 1000));
                    }
                });
            };
            scene.vars.scene.add(cube);
            scene.vars.scene.add(line);
            scene.vars.clickable.push(cube);
            resolve();
        });
    });
}

export function loadTopTiles(Scene) {
    return new Promise((resolve) => {
        addTile(0xffffff, -30, 0, 0, Scene, 'note1s').then(() => {
            addTile(0xffffff, -27, 0, 0, Scene, 'note3s').then(() => {
                addTile(0xffffff, -24, 0, 0, Scene, 'note5s').then(() => {
                    addTile(0xffffff, -21, 0, 0, Scene, 'note6s').then(() => {
                        addTile(0xffffff, -18, 0, 0, Scene, 'note8s').then(() => {
                            addTile(0xffffff, -15, 0, 0, Scene, 'note10s').then(() => {
                                addTile(0xffffff, -12, 0, 0, Scene, 'note12s').then(() => {
                                    addTile(0xffffff, -9, 0, 0, Scene, 'note1o').then(() => {
                                        addTile(0xffffff, -6, 0, 0, Scene, 'note3o').then(() => {
                                            addTile(0xffffff, -3, 0, 0, Scene, 'note5o').then(() => {
                                                addTile(0x000000, -28.5, 1.5, -2, Scene, 'note2s', 2, 11, 1).then(() => {
                                                    addTile(0x000000, -25.5, 1.5, -2, Scene, 'note4s', 2, 11, 1).then(() => {
                                                        addTile(0x000000, -19.5, 1.5, -2, Scene, 'note7s', 2, 11, 1).then(() => {
                                                            addTile(0x000000, -16.5, 1.5, -2, Scene, 'note9s', 2, 11, 1).then(() => {
                                                                addTile(0x000000, -13.5, 1.5, -2, Scene, 'note11s', 2, 11, 1).then(() => {
                                                                    addTile(0x000000, -7.5, 1.5, -2, Scene, 'note2o', 2, 11, 1).then(() => {
                                                                        addTile(0x000000, -4.5, 1.5, -2, Scene, 'note4o', 2, 11, 1).then(() => {
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
        addTile(0xffffff, 3, 0, 0, Scene, 'note8o').then(() => {
            addTile(0xffffff, 6, 0, 0, Scene, 'note10o').then(() => {
                addTile(0xffffff, 9, 0, 0, Scene, 'note12o').then(() => {
                    addTile(0xffffff, 12, 0, 0, Scene, 'note1t').then(() => {
                        addTile(0xffffff, 15, 0, 0, Scene, 'note3t').then(() => {
                            addTile(0xffffff, 18, 0, 0, Scene, 'note5t').then(() => {
                                addTile(0xffffff, 21, 0, 0, Scene, 'note6t').then(() => {
                                    addTile(0xffffff, 24, 0, 0, Scene, 'note8t').then(() => {
                                        addTile(0xffffff, 27, 0, 0, Scene, 'note10t').then(() => {
                                            addTile(0xffffff, 30, 0, 0, Scene, 'note12t').then(() => {
                                                addTile(0x000000, 4.5, 1.5, -2, Scene, 'note9o', 2, 11, 1).then(() => {
                                                    addTile(0x000000, 7.5, 1.5, -2, Scene, 'note11o', 2, 11, 1).then(() => {
                                                        addTile(0x000000, 13.5, 1.5, -2, Scene, 'note2t', 2, 11, 1).then(() => {
                                                            addTile(0x000000, 16.5, 1.5, -2, Scene, 'note4t', 2, 11, 1).then(() => {
                                                                addTile(0x000000, 22.5, 1.5, -2, Scene, 'note7t', 2, 11, 1).then(() => {
                                                                    addTile(0x000000, 25.5, 1.5, -2, Scene, 'note9t', 2, 11, 1).then(() => {
                                                                        addTile(0x000000, 28.5, 1.5, -2, Scene, 'note11t', 2, 11, 1).then(() => {
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
        addTile(0xffffff, 0, 0, 0, Scene, 'note6o').then(() => {
            addTile(0x000000, 1.5, 1.5, -2, Scene, 'note7o', 2, 11, 1).then(() => {
                resolve();
            });
        });
    });
}

export function loadPlayButton(Scene) {
    return new Promise(resolve => {
        let geom = new THREE.Geometry();
        let v1 = new THREE.Vector3(-5, 10, -20);
        let v2 = new THREE.Vector3(-5, 0, -20);
        let v3 = new THREE.Vector3(5, 5, -20);
        let triangle = new THREE.Triangle(v1, v2, v3);
        let normal = triangle.normal();
        geom.vertices.push(triangle.a);
        geom.vertices.push(triangle.b);
        geom.vertices.push(triangle.c);
        geom.faces.push(new THREE.Face3(0, 1, 2, normal));
        let mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({color: 'red'}));
        mesh.callback = () => {
            playMelody(Scene);
        };
        Scene.vars.scene.add(mesh);
        Scene.vars.clickable.push(mesh);
        resolve();
    });
}

function playMelody(Scene) {
    if (!Scene.vars.isPlaying) {
        Scene.vars.isPlaying = true;
        let notesAndDuration = [
            'note1o', 'note3o', 'note5o', 'note1o',
            'note1o', 'note3o', 'note5o', 'note1o',
            'note5o', 'note6o', 'note8o', null,
            'note5o', 'note6o', 'note8o', null,
            ['note8o', 400], ['note10o', 200], ['note8o', 250],
            ['note6o', 300], 'note5o', 'note1o',
            ['note8o', 400], ['note10o', 200], ['note8o', 250],
            ['note6o', 300], 'note5o', 'note1o',
            'note1o', 'note8s', 'note1o', null,
            'note1o', 'note8s', 'note1o'
        ];
        asyncForEach(notesAndDuration, async (note, index) => {
            let noteToPlay = Scene.vars.scene.getObjectByName(Array.isArray(note) ? note[0] : note);
            if (noteToPlay) await noteToPlay.callback(Array.isArray(note) ? note[1] : null, true);
            else await pause();
            Scene.vars.isPlaying = !(index === notesAndDuration.length - 1);
        });
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function pause() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 500);
    })
}


