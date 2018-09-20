import Scene from "./scene.js";
import CONFIG from "../config";
import * as particles from "pixi-particles";
import fire_particle from "../assets/fire-particle.png";

export default class FireScene extends Scene {

    Setup() {

        this.emitter = new PIXI.particles.Emitter(
            this.container,
            [PIXI.Texture.fromImage(CONFIG.RESOURCE_PATH_FIRE)],
            {
                alpha: {
                    list: [
                        {
                            value: 0.8,
                            time: 0
                        },
                        {
                            value: 0.1,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                scale: {
                    list: [
                        {
                            value: 0,
                            time: 0
                        },
                        {
                            value: 1,
                            time: 1.05
                        },
                        {
                            value: 0.3,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                color: {
                    list: [
                        {
                            value: "ffffa9",
                            time: 0
                        },
                        {
                            value: "e01f00",
                            time: 0.05
                        },
                        {
                            value: "fffc00",
                            time: 0.2
                        },
                        {
                            value: "ffffa9",
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                speed: {
                    list: [
                        {
                            value: 2000,
                            time: 0
                        },
                        {
                            value: 100,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                startRotation: {
                    min: 180,
                    max: 200
                },
                rotationSpeed: {
                    min: 5,
                    max: 10
                },
                lifetime: {
                    min: 0.04,
                    max: 0.05
                },
                frequency: 0.008,
                spawnChance: 1,
                particlesPerWave: 1,
                emitterLifetime: 0,
                maxParticles: CONFIG.PARTICLE_COUNT,
                pos: {
                    x: -100,
                    y: 100
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 0,
                    y: 10,
                    r: 10
                }
            }
        );

        this.AddBackButton();
    }

    Enable() {
        this.emitter.emit = true;
    }

    Disable() {
        this.emitter.emit = false;
    }

    Update() {
        this.emitter.update(PIXI.ticker.shared.deltaTime * 0.001);
    }
}