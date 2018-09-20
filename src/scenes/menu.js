import Scene from "./scene.js";
import MenuButton from "../button";
import {SCENES} from "../client";

export default class MenuScene extends Scene {

    Setup() {

        let button_card = new MenuButton(0, 0, 250, 40, "Task 1: Card Swap", () => {
            this.client.LoadScene(SCENES.CARD)
        });
        let button_text = new MenuButton(0, 50, 250, 40, "Task 2: Text & Images", () => {
            this.client.LoadScene(SCENES.TEXT)
        });
        let button_fire = new MenuButton(0, 100, 250, 40, "Task 3: Fire Particle Effect", () => {
            this.client.LoadScene(SCENES.FIRE)
        });

        this.container.addChild(button_card.ButtonContainer);
        this.container.addChild(button_text.ButtonContainer);
        this.container.addChild(button_fire.ButtonContainer);
    }

}