import * as PIXI from "pixi.js";
import * as tweenManager from "pixi-tween";
import CONFIG from "./config.js";
import MenuScene from "./scenes/menu";
import CardScene from "./scenes/card";
import TextScene from "./scenes/text";
import FireScene from "./scenes/fire";

export let SCENES = {};

export default class Client {

    constructor() {
        this.app = new PIXI.Application({
                autoResize: true,
                resolution: devicePixelRatio
            }
        );
        this.app.renderer.backgroundColor = 0xd3f5ff;
        document.body.appendChild(this.app.view);

        // Handle resize fullscreen.
        window.addEventListener('resize', () => {
            this.Resize();
        });
        this.Resize();
        //
    }

    Resize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    Init() {
        console.log("Loading...");

        PIXI.loader
            .add(CONFIG.RESOURCE_PATH_CARD)
            .add(CONFIG.RESOURCE_PATH_HAPPY)
            .add(CONFIG.RESOURCE_PATH_HAPPY_2)
            .add(CONFIG.RESOURCE_PATH_SAD)
            .add(CONFIG.RESOURCE_PATH_FIRE)
            .load(() => { // Lambda function for 'this' binding.
                this.Setup()
            });
    }

    Setup() {

        console.log("Loading complete.");

        this.scene_container = new PIXI.Container();
        this.scene_container.x = 300;
        this.scene_container.y = 100;
        this.app.stage.addChild(this.scene_container);

        //
        // FPS display.
        this.fps_display_background = new PIXI.Graphics();
        this.fps_display_background.beginFill(0x000000);
        this.fps_display_background.drawRect(0, 0, 100, 25);
        this.app.stage.addChild(this.fps_display_background);

        this.fps_display = new PIXI.Text("", new PIXI.TextStyle({
            fill: "#ffffff",
            fontSize: 14
        }));
        this.app.stage.addChild(this.fps_display);
        //
        //

        SCENES.MENU = new MenuScene(this);
        SCENES.CARD = new CardScene(this);
        SCENES.FIRE = new FireScene(this);
        SCENES.TEXT = new TextScene(this);

        // Start loading initial scene - will start automatically when loaded.
        this.LoadScene(SCENES.MENU);

        // Begin the main update loop.
        this.Update();
    }

    LoadScene(scene) {
        if (this.active_scene != null) {
            this.active_scene.Hide();
        }
        this.active_scene = scene;
        this.active_scene.Show();
    }

    Update() {
        this.active_scene.Update();

        window.requestAnimationFrame(() => {
            this.Update();
        });

        // Update all tweens.
        PIXI.tweenManager.update();

        // Update FPS counter.
        this.fps_display.text = Math.round(this.app.ticker.FPS) + " FPS";
        this.fps_display_background.clear();
        this.fps_display_background.drawRect(0, 0, this.fps_display.width, this.fps_display.height);
    }
}