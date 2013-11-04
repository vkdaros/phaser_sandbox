///<reference path='phaser.d.ts'/>
///<reference path='Scene.ts'/>
///<reference path='Menu.ts'/>
///<reference path='Boat.ts'/>
///<reference path='WinScene.ts'/>
///<reference path='LoseScene.ts'/>

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
        this.game.load.image('submarineLongImg',
                             'assets/images/submarine_long.png');
        this.game.load.image('barrelImg', 'assets/images/barrel.png');
        this.game.load.image('bombImg', 'assets/images/bomb.png');
    }

    public create(): void {
        this.game.state.add('Menu', new Menu(this.game), false);
        this.game.state.add('Boat', new Boat(this.game), false);
        this.game.state.add('Win', new WinScene(this.game), false);
        this.game.state.add('Lose', new LoseScene(this.game), false);
        this.game.state.start('Menu', true, true);
    }
}

window.onload = (
    function() {
        var boatGame = new BoatGame();
    }
);
