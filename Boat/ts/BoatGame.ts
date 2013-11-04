///<reference path='phaser.d.ts'/>
///<reference path='Scene.ts'/>
///<reference path='Menu.ts'/>
///<reference path='Boat.ts'/>

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
        // TODO: Make all assets load here in order to prevent loading wait
        //       every time a new state is started.
    }

    public create(): void {
        this.game.state.add('Menu', new Menu(this.game), false);
        this.game.state.add('Boat', new Boat(this.game), false);
        this.game.state.start('Menu', true, true);
    }
}

window.onload = (
    function() {
        var boatGame = new BoatGame();
    }
);
