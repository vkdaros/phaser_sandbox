///<reference path='phaser.d.ts'/>
///<reference path="Scene.ts"/>

class Boat extends Scene {
    private boat: Phaser.Sprite;
    private submarines: Phaser.Group;
    private barrel: Phaser.Sprite;

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

        this.barrel = this.game.add.sprite(9999, 9999, 'barrelImg');
        this.barrel.anchor.x = 0.5;
        this.barrel.anchor.y = 0.0;
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


        // throw barrel
        if(keyboard.isDown(keys.DOWN)) {
            if(this.barrel.body.y > 650) {
                this.barrel.body.y = this.boat.position.y + 30;
                this.barrel.body.x = this.boat.position.x;
            }
        }
        this.barrel.body.velocity.y = 100;

        // handle collision barrel x submarines
        this.game.physics.collide(this.barrel, this.submarines,
                                  this.handleBarrelSubmarinesCollision,
                                  null, this);
    }

    private handleBarrelSubmarinesCollision(barrel: Phaser.Sprite,
                                            submarine: Phaser.Sprite): void {
        barrel.reset(9999, 9999);
        submarine.kill();
        if(this.submarines.countLiving() == 0)
            this.setScene('Win');
    }
}
