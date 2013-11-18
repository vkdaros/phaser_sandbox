///<reference path="phaser.d.ts"/>
///<reference path="Scene.ts"/>
///<reference path="Menu.ts"/>
///<reference path="Boat.ts"/>
///<reference path="Win.ts"/>
///<reference path="Lose.ts"/>

class BoatGame {
    private game: Phaser.Game;

    constructor() {
        var state = new Phaser.State();
        state.preload = this.preload;
        state.create = this.create;

        this.game = new Phaser.Game(960, 640, Phaser.CANVAS, "", state, false,
                                    false);
    }

    public displayLoadingScreen(percentage: number): void {

    }

    public preload(): void {
        var fontConfig = {
            font: "48px Arial",
            fill: "#b55",
            align: "center"
        };
        var text: Phaser.Text;
        text = this.game.add.text(480, 240, "", fontConfig);
        text.anchor.setTo(0.5, 0.5);
        var u = (percentage: number) => (text['content'] = percentage + "%");

        // ---

        u(0);  this.game.load.image("backgroundImg", "assets/images/background.png");
        u(15); this.game.load.image("boatImg", "assets/images/boat.png");
        u(30); this.game.load.image("barrelImg", "assets/images/barrel.png");
        u(45); this.game.load.image("bombImg", "assets/images/bomb.png");

        u(60); this.game.load.spritesheet("explosionAnim",
                                   "assets/images/explosionframes.png",
                                   128, 128, 20);

        // Each submarine frame is 145x30 pixels and there are 2 of them.
        u(75); this.game.load.spritesheet("submarineLongImg",
                             "assets/images/submarine_long.png", 145, 30, 2);

        u(90); this.game.load.audio("explosionSound",
                             ["assets/sounds/underwater_explosion.ogg"]);

        // done!
        u(100);
    }

    public create(): void {
        // lock keys
        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;
        keyboard.addKeyCapture(keys.LEFT);
        keyboard.addKeyCapture(keys.RIGHT);
        keyboard.addKeyCapture(keys.SPACEBAR);

        // add scenes
        this.game.state.add("Menu", new Menu(this.game), false);
        this.game.state.add("Boat", new Boat(this.game), false);
        this.game.state.add("Win", new Win(this.game), false);
        this.game.state.add("Lose", new Lose(this.game), false);
        this.game.state.start("Menu", true, true);
    }
}

window.onload = (
    function() {
        var boatGame = new BoatGame();
    }
);
