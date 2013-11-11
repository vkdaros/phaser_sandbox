///<reference path='phaser.d.ts'/>
///<reference path='Scene.ts'/>
///<reference path='Menu.ts'/>
///<reference path='Boat.ts'/>
///<reference path='Win.ts'/>
///<reference path='Lose.ts'/>

class BoatGame {
    private game: Phaser.Game;

    constructor() {
        var state = new Phaser.State();
        state.preload = this.preload;
        state.create = this.create;

        this.game = new Phaser.Game(960, 640, Phaser.CANVAS, '', state, false,
                                    false);
    }

    public preload(): void {
        this.game.load.image('backgroundImg', 'assets/images/background.png');
        this.game.load.image('boatImg', 'assets/images/boat.png');
        this.game.load.image('barrelImg', 'assets/images/barrel.png');
        this.game.load.image('bombImg', 'assets/images/bomb.png');

        this.game.load.spritesheet('explosionAnim',
                                   'assets/images/explosionframes.png',
                                   128, 128, 20);

        // Each submarine frame is 145x30 pixels and there are 2 of them.
        this.game.load.spritesheet('submarineLongImg',
                             'assets/images/submarine_long.png', 145, 30, 2);

        this.game.load.audio('explosionSound',
                             ['assets/sounds/underwater_explosion.ogg']);
    }

    public create(): void {
        // lock keys
        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;
        keyboard.addKeyCapture(keys.LEFT);
        keyboard.addKeyCapture(keys.RIGHT);
        keyboard.addKeyCapture(keys.SPACEBAR);

        // add scenes
        this.game.state.add('Menu', new Menu(this.game), false);
        this.game.state.add('Boat', new Boat(this.game), false);
        this.game.state.add('Win', new Win(this.game), false);
        this.game.state.add('Lose', new Lose(this.game), false);
        this.game.state.start('Menu', true, true);
    }
}

window.onload = (
    function() {
        var boatGame = new BoatGame();
    }
);
