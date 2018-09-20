export default class Scene {

    constructor(client) {
        this._container = new PIXI.Container;
        this.container.visible = false;
        client.scene_container.addChild(this.container);
        this.Setup(client);
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

    Show() {
        this.Enable();
        this.container.visible = true;
    }

    Hide() {
        this.container.visible = false;
        this.Disable();
    }
}