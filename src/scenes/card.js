import Scene from "./scene.js";
import card from "../assets/card-bg.png";
import CONFIG from "../config.js";
import MenuButton from "../button";
import SCENES from "../client";

export default class CardScene extends Scene {

    Setup() {
        this.card_container = new PIXI.Container();
        this.card_container.scale.set(0.5);
        this.card_container.x = -200;
        this.card_container.y = 100;
        this.container.addChild(this.card_container);
        let card_texture = PIXI.utils.TextureCache[CONFIG.RESOURCE_PATH_CARD];

        this.cards_left = [];
        this.cards_right = [];

        // Generate card sprites.
        for (let i = 0; i < CONFIG.CARD_COUNT; i++) {
            let card = new PIXI.Sprite(card_texture);
            this.cards_left.push(card);
            card.x = CONFIG.LEFT_DECK_POSITION.x + i * CONFIG.CARD_POSITION_OFFSET.x;
            card.y = CONFIG.LEFT_DECK_POSITION.y + i * CONFIG.CARD_POSITION_OFFSET.y;
            card.anchor.set(0.5);
            card.rotation = (Math.random() * (CONFIG.CARD_ROTATION_MAX_OFFSET) -
                (CONFIG.CARD_ROTATION_MAX_OFFSET * 0.5));
            this.card_container.addChild(card);
        }

        this.card_swap_direction = "right";

        this.AddBackButton();
    }

    NextCard() {

        // Get a card from the left or right deck depending on the current direction.
        let card;
        if (this.card_swap_direction === "right") {
            // No cards left - switch direction.
            if (this.cards_left.length <= 0) {
                this.card_swap_direction = "left";
                return;
            }
            card = this.cards_left.pop();
            this.cards_right.push(card);
        } else {
            // No cards left - switch direction.
            if (this.cards_right.length <= 0) {
                this.card_swap_direction = "right";
                return;
            }
            card = this.cards_right.pop();
            this.cards_left.push(card);
        }

        // Add next card to the top of the draw-order.
        this.card_container.addChild(card);

        let tween = PIXI.tweenManager.createTween(card);
        tween.easing = PIXI.tween.Easing.inOutQuad();
        tween.time = CONFIG.CARD_SWAP_DURATION;
        tween.from({
            x: card.x,
            y: card.y
        });

        if (this.card_swap_direction == "right") {
            tween.to({
                x: CONFIG.RIGHT_DECK_POSITION.x,
                y: CONFIG.RIGHT_DECK_POSITION.y + this.cards_right.length * CONFIG.CARD_POSITION_OFFSET.y
            });
        } else {
            tween.to({
                x: CONFIG.LEFT_DECK_POSITION.x,
                y: CONFIG.LEFT_DECK_POSITION.y + this.cards_left.length * CONFIG.CARD_POSITION_OFFSET.y
            });
        }

        tween.start();
    }

    Enable() {
        // Start the card swap routine.
        this.next_card_interval = setInterval(() => {
            this.NextCard()
        }, CONFIG.CARD_SWAP_DELAY);
    }

    Disable() {
        clearInterval(this.next_card_interval);
    }
}