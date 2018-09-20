export default class MenuButton {

    constructor(x, y, width, height, text, onActivate) {

        this.ButtonOnActivate = onActivate;

        this.ButtonRect = new PIXI.Graphics;
        this.ButtonRect.beginFill(0xFFFF00);
        this.ButtonRect.lineStyle(5, 0x000000);
        this.ButtonRect.drawRect(0, 0, width, height);

        this.ButtonText = new PIXI.Text(text, {
            fontFamily: "Arial",
            fontSize: 24,
            fill: "white",
            align: "center"
        });
        this.ButtonText.anchor.set(0.5, 0.5);

        this.ButtonContainer = new PIXI.Container();
        this.ButtonContainer.pivot.x = width * 0.5;
        this.ButtonContainer.pivot.y = height * 0.5;
        this.ButtonContainer.x = x;
        this.ButtonContainer.y = y;
        this.ButtonContainer.interactive = true;
        this.ButtonContainer.buttonMode = true;
        this.ButtonContainer
            .on('pointerdown', () => {
                this.OnButtonDown();
            })
            .on('pointerup', () => {
                this.OnButtonUp;
            })
            .on('pointerupoutside', () => {
                this.OnButtonUp;
            })
            .on('pointerover', () => {
                this.OnButtonOver;
            })
            .on('pointerout', () => {
                this.OnButtonOut;
            });

        this.ButtonContainer.addChild(this.ButtonRect);
        this.ButtonContainer.addChild(this.ButtonText);
    }

    OnButtonDown() {
        this.ButtonContainer.alpha = 0.5;
        this.ButtonOnActivate && this.ButtonOnActivate();
    }

    OnButtonUp() {
        this.ButtonContainer.alpha = 1;
    }

    OnButtonOver() {
        this.ButtonContainer.alpha = 0.8;
    }

    OnButtonOut() {
        this.ButtonContainer.alpha = 1;
    }
}