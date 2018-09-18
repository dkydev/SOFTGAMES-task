import * as PIXI from "pixi.js";
import css from "./css/main.css";
import RESOURCE_PATH_CARD from "./assets/card-bg.png";
//let RESOURCE_PATH_CARD = "./assets/card-bg.png";

let app = new PIXI.Application({
        autoResize: true,
        resolution: devicePixelRatio
    }
);
document.body.appendChild(app.view);

// Handle resize fullscreen.
let resize = function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', resize);
resize();
//

PIXI.loader
    .add(RESOURCE_PATH_CARD)
    .load(setup);

function setup() {
    let card_texture = PIXI.utils.TextureCache[RESOURCE_PATH_CARD].texture;

    let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 14,
        fill: "white",
        stroke: '#000000',
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: "#00000064",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });

    let card_offset_x = 2;
    let card_offset_y = -2;

    let card_container = new PIXI.Container();

    let cards = [];
    for (let i = 0; i < 144; i++) {
        let card = new PIXI.Sprite(card_texture);
        //card.addChild(new Text(i + 1, style));
        cards.push(card);
        card.x = i * card_offset_x;
        card.y = i * card_offset_y;
        card_container.addChild(card);

    }

    app.stage.addChild(card_container);


}