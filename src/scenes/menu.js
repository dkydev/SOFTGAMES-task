import Scene from "./scene.js";
import MenuButton from "../button";

export default class MenuScene extends Scene {

    Setup(client) {

        let button_card = new MenuButton(0, 0, 200, 40, "Card Swap");
        let button_text = new MenuButton(0, 50, 200, 40, "Text & Images");
        let button_fire = new MenuButton(0, 100, 200, 40, "Fire Particle Effect");

        this.container.addChild(button_card.ButtonContainer);
        this.container.addChild(button_text.ButtonContainer);
        this.container.addChild(button_fire.ButtonContainer);
    }

}