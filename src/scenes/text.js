import Scene from "./scene.js";
import CONFIG from "../config";
import emoji_happy from "../assets/emoji-happy.png";
import emoji_happy_2 from "../assets/emoji-happy-2.png";
import emoji_sad from"../assets/emoji-sad.png";

let TEXT_OPTIONS = "some random text :) :( :D".split(" ");

export default class TextScene extends Scene {

    Setup() {
        this.children = [];

        this.AddBackButton();
    }

    NextText() {
        // Clear previous text/images.
        this.children.forEach((child) => {
            this.container.removeChild(child);
        });

        // Clone the options array.
        let options = TEXT_OPTIONS.slice(0);

        // Get three random entries from the cloned array.
        let new_text_options = [];
        new_text_options.push(options.splice(Math.floor(Math.random() * options.length), 1)[0]);
        new_text_options.push(options.splice(Math.floor(Math.random() * options.length), 1)[0]);
        new_text_options.push(options.splice(Math.floor(Math.random() * options.length), 1)[0]);

        this.cursor_x = 0;
        for (let i = 0; i < new_text_options.length; i++) {
            switch (new_text_options[i]) {
                case ":)":
                    this.cursor_x += this.DrawImage(CONFIG.RESOURCE_PATH_HAPPY);
                    break;
                case ":D":
                    this.cursor_x += this.DrawImage(CONFIG.RESOURCE_PATH_HAPPY_2);
                    break;
                case ":(":
                    this.cursor_x += this.DrawImage(CONFIG.RESOURCE_PATH_SAD);
                    break;
                default:
                    this.cursor_x += this.DrawText(new_text_options[i]);
            }
        }
    }

    DrawImage(path) {
        let texture = PIXI.utils.TextureCache[path];

        let image = new PIXI.Sprite(texture);
        image.x = this.cursor_x;
        image.anchor.set(0, 0.5);

        this.children.push(image);
        this.container.addChild(image);

        return image.width;
    }

    DrawText(text) {
        let textSprite = new PIXI.Text(text, {
            fontFamily: "Arial",
            fontSize: Math.random() * 16 + 16,
            fill: "black",
            align: "left"
        });
        textSprite.x = this.cursor_x;
        textSprite.anchor.set(0, 0.5);

        this.children.push(textSprite);
        this.container.addChild(textSprite);

        return textSprite.width;
    }

    Enable() {
        // Start the card swap routine.
        this.text_change_interval = setInterval(() => {
            this.NextText()
        }, CONFIG.TEXT_CHANGE_DELAY);
    }

    Disable() {
        clearInterval(this.text_change_interval);
    }

}