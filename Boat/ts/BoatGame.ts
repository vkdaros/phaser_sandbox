///<reference path="phaser.d.ts"/>
///<reference path="Scene.ts"/>
///<reference path="Menu.ts"/>
///<reference path="Boat.ts"/>
///<reference path="Win.ts"/>
///<reference path="Lose.ts"/>

class BoatGame {
    private game: Phaser.Game;
    private loadingText: Phaser.Text;

    constructor() {
        var state = new Phaser.State();
        state.preload = () => this.preload.call(this);
        state.create = this.create;

        this.game = new Phaser.Game(960, 640, Phaser.CANVAS, "", state, false,
                                    false);
    }

    public preload(): void {
        this.setupLoadingScreen();
        var u = (p) => this.updateLoadingScreen.call(this, p);

        // mobile settings
        this.game.stage["disableVisibilityChange"] = true;
        this.game.stage.scale["alignPageHorizontally"] = true;
        if (!this.game.device.desktop) {
            this.game.input.addPointer();
            /*this.game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
            this.game.stage.scale["minWidth"] = 480;
            this.game.stage.scale["minHeight"] = 320;
            this.game.stage.scale["forceLandscape"] = true;
            this.game.stage.scale.setScreenSize(true);
            this.game.stage.scale.startFullScreen();*/
        }

        // load assets
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

    private setupLoadingScreen(): void {
        var fontConfig = {
            font: "48px Arial",
            fill: "#b55",
            align: "center"
        };
        this.loadingText = this.game.add.text(480, 240, "0%", fontConfig);
        this.loadingText.anchor.setTo(0.5, 0.5);
    }

    private updateLoadingScreen(percentage: number): void {
        this.loadingText["content"] = percentage + "%";
    }
}

/*window.onload = (
    function() {
        var boatGame = new BoatGame();
    }
);*/
console.log("vou inicializar!");
var boatGame = new BoatGame();
console.log("inicializei...");
