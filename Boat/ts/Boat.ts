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
            var plusMinus: number = 2 * Math.round(Math.random()) - 1;
            var x: number = 480  + plusMinus * (550 + Math.random() * 100);
            var y: number = 230 + Math.random() * 350;
            submarine = this.submarines.create(x, y, 'submarineLongImg', "0",
                                               true);
            submarine.anchor.x = 0.5;
            submarine.anchor.y = 0.5;

            submarine.animations.add('turnLeft', [0]);
            submarine.animations.add('turnRight', [1]);

            // Hack! Should be: Phaser.Easing.Linear.None;
            var LinearNone = Phaser.Easing['Linear'].None;
            var duration = 5000 + Math.random() * 5000;
            this.game.add.tween(submarine).to({x: 50}, duration, LinearNone,
                                              false, 0, false)
                                          .to({x: 880}, duration, LinearNone,
                                              false, 0, false)
                                          .loop().start(1);
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
