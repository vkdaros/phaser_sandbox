///<reference path='phaser.d.ts'/>
///<reference path="Scene.ts"/>

class Boat extends Scene {
    private boat: Phaser.Sprite;
    private submarines: Phaser.Group;

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

        this.submarines = this.game.add.group(null, 'submarines');
        for (var i: number = 0; i < 5; i++) {
            var submarine: Phaser.Sprite;
            var x = 30 + 180 * i;
            var y = 300 + Math.random() * 300;
            submarine = this.submarines.create(x, y, 'submarineLongImg', "0",
                                               true);
            submarine.anchor.x = 0.5;
            submarine.anchor.y = 0.5;
        }
    }

    public update(): void {
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
