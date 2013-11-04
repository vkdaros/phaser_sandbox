///<reference path='phaser.d.ts'/>
///<reference path="Scene.ts"/>

class Boat extends Scene {
    private boat: Phaser.Sprite;
    private submarine: Phaser.Sprite;

    constructor(game: Phaser.Game) {
        super(game);
    }

    public create(): void {
        this.game.add.sprite(0, 0, 'backgroundImg');

        this.boat = this.game.add.sprite(320, 170, 'boatImg');
        this.boat.body.maxVelocity.x = 100;
        this.boat.body.drag.x = 50;
        this.boat.anchor.x = 0.5;
        this.boat.anchor.y = 0.5;
        
        this.submarine = this.game.add.sprite(600, 300, 'submarineLongImg');
        this.submarine.anchor.x = 0.5;
        this.submarine.anchor.y = 0.5;
    }

    public update(): void {
        this.submarine.angle += 1;

        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;

        this.boat.body.acceleration.x = 0;
        if (keyboard.isDown(keys.LEFT)) {
            this.boat.body.acceleration.x = -50;
        }
        if (keyboard.isDown(keys.RIGHT)) {
            this.boat.body.acceleration.x = 50;
        }
    }
}
