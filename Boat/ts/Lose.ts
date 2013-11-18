///<reference path="phaser.d.ts"/>
///<reference path="Scene.ts"/>

class Lose extends Scene {
    private text: Phaser.Text;

    constructor(game: Phaser.Game) {
        super(game);
    }

    public create(): void {
        var fontConfig = {
            font: "48px Arial",
            fill: "#ff8888",
            align: "center"
        };
        this.text = this.game.add.text(this.game.world.centerX,
                                       this.game.world.centerY,
                                       "LOSER\nTap to play again",
                                       fontConfig);
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
    }

    public update(): void {
        if (this.game.input.activePointer.justPressed()) {
            this.setScene("Boat");
        }
    }
}
