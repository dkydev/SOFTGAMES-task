import * as PIXI from "pixi.js";
import * as tweenManager from "pixi-tween";
import css from "./css/main.css";
import card from "./assets/card-bg.png";

let RESOURCE_PATH_CARD = "assets/card-bg.png";

let app = new PIXI.Application({
        autoResize: true,
        resolution: devicePixelRatio
    }
);
app.renderer.backgroundColor = 0xd3f5ff;
document.body.appendChild(app.view);

// Handle resize fullscreen.
let resize = function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', resize);
resize();
//

PIXI.loader
    .add(RESOURCE_PATH_CARD)
    .load(setup);

const FPS = 30;
const card_count = 144;
const left_deck_position = {
    x: 0,
    y: 0
};
const right_deck_position = {
    x: 400,
    y: 0
};
const card_swap_delay = 100
const card_swap_duration = 2000;

let card_container;

let card_swap_direction = "right";
let cards_left = [];
let cards_right = [];
let card_position_offset = {
    x: 0,
    y: 2
};

function setup() {

    console.log("Doing setup...");

    let card_texture = PIXI.utils.TextureCache[RESOURCE_PATH_CARD];

    card_container = new PIXI.Container();

    for (let i = 0; i < card_count; i++) {
        let card = new PIXI.Sprite(card_texture);
        cards_left.push(card);
        card.x = left_deck_position.x + i * card_position_offset.x;
        card.y = left_deck_position.y + i * card_position_offset.y;
        card.anchor.set(0.5);
        card.rotation = (Math.random() * (Math.PI / 16) - (Math.PI / 32));
        card_container.addChild(card);
    }

    app.stage.addChild(card_container);

    console.log("Setup complete.");

    start();
}

function start() {

    console.log("Starting...");

    function nextCard() {

        // Get a card from the left or right deck depending on the current direction.
        let card;
        if (card_swap_direction === "right") {
            // No cards left: switch direction.
            if (cards_left.length <= 0) {
                console.log("Swapping cards left.")
                card_swap_direction = "left";
                return;
            }
            card = cards_left.pop();
            cards_right.push(card);
        } else {
            // No cards left: switch direction.
            if (cards_right.length <= 0) {
                console.log("Swapping cards right.")
                card_swap_direction = "right";
                return;
            }
            card = cards_right.pop();
            cards_left.push(card);
        }

        // Top of draw-order.
        card_container.addChild(card);

        let tween = PIXI.tweenManager.createTween(card);
        tween.easing = PIXI.tween.Easing.inOutQuad();
        tween.time = card_swap_duration;
        tween.from({
            x: card.x,
            y: card.y
        });

        if (card_swap_direction == "right") {
            tween.to({
                x: right_deck_position.x,
                y: right_deck_position.y + cards_right.length * card_position_offset.y
            });
        } else {
            tween.to({
                x: left_deck_position.x,
                y: left_deck_position.y + cards_left.length * card_position_offset.y
            });
        }

        tween.start();
    }

    setInterval(nextCard, card_swap_delay)

    //
    // FPS display.
    let fps_display_background = new PIXI.Graphics();
    fps_display_background.beginFill(0x000000);
    fps_display_background.drawRect(0, 0, 100, 25);
    app.stage.addChild(fps_display_background);

    let fps_display = new PIXI.Text("", new PIXI.TextStyle({
        fill: "#ffffff",
        fontSize: 14
    }));
    app.stage.addChild(fps_display);
    //
    //

    function animate() {
        window.requestAnimationFrame(animate);
        //app.renderer.render(app.stage);
        PIXI.tweenManager.update();

        fps_display.text = Math.round(app.ticker.FPS) + " FPS";
        fps_display_background.clear();
        fps_display_background.drawRect(0, 0, fps_display.width, fps_display.height);

        card_container.x = app.renderer.width * 0.5;// - card_container.width * 0.5; // app.renderer.width;
        card_container.y = app.renderer.height * 0.5;// - card_container.height * 0.5; // app.renderer.height;
        card_container.pivot.x =card_container.width * 1;// - card_container.width * 0.5; // app.renderer.width;
        card_container.pivot.y = card_container.height * 1;// - card_container.height * 0.5; // app.renderer.height;

    }

    animate();
}