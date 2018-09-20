import MenuButton from "../button";
import {SCENES} from "../client";

export default class Scene {

    constructor(client) {
        this.client = client;
        this._container = new PIXI.Container;
        this.container.visible = false;
        this.client.scene_container.addChild(this.container);
        this.Setup();
    }

    get container() {
        return this._container;
    }

    Setup(app) {
        // To be overridden.
    }

    Enable() {
        // To be overridden.
    }

    Disable() {
        // To be overridden.
    }

    Update() {
        // To be overridden.
    }

    Show() {
        this.Enable();
        this.container.visible = true;
    }

    Hide() {
        this.container.visible = false;
        this.Disable();
    }

    AddBackButton() {
        let button_back = new MenuButton(
            0, 0, 250, 40, "Back to Menu", () => {
                this.client.LoadScene(SCENES.MENU)
            }
        );
        this.container.addChild(button_back.ButtonContainer);
    }
}