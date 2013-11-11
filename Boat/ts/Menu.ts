///<reference path="phaser.d.ts"/>
///<reference path="Scene.ts"/>

class Menu extends Scene {
    private text: Phaser.Text;

    constructor(game: Phaser.Game) {
        super(game);
    }

    public create(): void {
        var fontConfig = {
            font: "48px Arial",
            fill: "#ffffff",
            align: "center"
        };
        this.text = this.game.add.text(this.game.world.centerX,
                                       this.game.world.centerY,
                                       "Press SPACE to play.\nArrows to move.\nSPACE to fire.",
                                       fontConfig);
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
    }

    public update(): void {
        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;

        if (keyboard.isDown(keys.SPACEBAR)) {
            this.setScene('Boat');
        }
    }
}
