///<reference path='phaser.d.ts'/>
///<reference path="Scene.ts"/>

class Boat extends Scene {
    private boat: Phaser.Sprite;
    private submarines: Phaser.Group;
    private barrels: Phaser.Group;
    private bombs: Phaser.Group;
    private isBoatShooting: boolean;
    private lastSubmarineShot: number;
    private lives: number;
    private hud: Phaser.Text;

    constructor(game: Phaser.Game) {
        super(game);
    }

    public create(): void {
        this.isBoatShooting = false;
        this.lives = 3;

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

            // Hack! Should be: Phaser.Easing.Linear.None;
            var LinearNone = Phaser.Easing['Linear'].None;
            var duration = 5000 + Math.random() * 5000;
            this.game.add.tween(submarine).to({x: 50}, duration, LinearNone,
                                              false, 0, false)
                                          .to({x: 880}, duration, LinearNone,
                                              false, 0, false)
                                          .loop().start(1);
        }

        this.barrels = this.game.add.group(null, "barrels");
        for (var i: number = 0; i < 30; i++) {
            var barrel: Phaser.Sprite;
            barrel = this.barrels.create(9999, 9999, "barrelImg", "0", true);
            barrel.anchor.x = 0.5;
            barrel.anchor.y = 0.5;
            barrel.kill();
        }

        this.bombs = this.game.add.group(null, "bombs");
        for (var i: number = 0; i < 30; i++) {
            var bomb: Phaser.Sprite;
            bomb = this.bombs.create(9999, 9999, "bombImg", "0", true);
            bomb.anchor.x = 0.5;
            bomb.anchor.y = 0.5;
            bomb.kill();
        }

        this.lastSubmarineShot = this.game.time.totalElapsedSeconds();

        var fontConfig = {
            font: "48px Arial",
            fill: "#222",
            align: "left"
        };
        this.hud = this.game.add.text(10, 10, "", fontConfig);
    }

    public update(): void {
        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;

        // boat movement
        this.boat.body.acceleration.x = 0;
        if (keyboard.isDown(keys.LEFT)) {
            this.boat.body.acceleration.x = -50;
        }
        if (keyboard.isDown(keys.RIGHT)) {
            this.boat.body.acceleration.x = 50;
        }

        // hud
        this.hud['content'] = "lives: " + this.lives;

        // throw barrel
        if (!this.isBoatShooting) {
            if (keyboard.isDown(keys.DOWN)) {
                var barrel: Phaser.Sprite = this.barrels.getFirstDead();
                if (barrel) {
                    barrel.body.y = this.boat.position.y + 30;
                    barrel.body.x = this.boat.position.x;
                    barrel.revive();
                    this.isBoatShooting = true;
                }
            }
        }
        else {
            if (!keyboard.isDown(keys.DOWN)) {
                this.isBoatShooting = false;
            }
        }

        // submarines can shoot too!!
        if (this.game.time.totalElapsedSeconds() > this.lastSubmarineShot+2) {
            this.lastSubmarineShot = this.game.time.totalElapsedSeconds();
            this.submarines.forEach(this.handleSubmarineShot, this, true);
        }

        // handle bomb movement
        this.bombs.forEach(this.handleBombMovement, this, true);

        // handle barrel movement
        this.barrels.forEach(this.handleBarrelMovement, this, true);

        // handle collision bomb x boat
        this.game.physics.collide(this.bombs, this.boat,
                                  this.handleBombsBoatCollision,
                                  null, this);

        // handle collision barrel x submarines
        this.game.physics.collide(this.barrels, this.submarines,
                                  this.handleBarrelSubmarineCollision,
                                  null, this);
    }

    private handleSubmarineShot(submarine: Phaser.Sprite): void {
        var bomb: Phaser.Sprite = this.bombs.getFirstDead();
        if (bomb) {
            bomb.body.y = submarine.position.y;
            bomb.body.x = submarine.position.x;
            bomb.revive();
        }
    }

    private handleBarrelSubmarineCollision(barrel: Phaser.Sprite,
                                           submarine: Phaser.Sprite): void {
        barrel.kill();
        submarine.kill();
        this.createExplosionAt(barrel.body.x, barrel.body.y);
        if (this.submarines.countLiving() == 0) {
            this.setScene('Win');
        }
    }

    private handleBarrelMovement(barrel: Phaser.Sprite): void {
        barrel.body.velocity.y = 100;
        if (barrel.body.y > 650) {
            barrel.kill();
        }
    }

    private handleBombMovement(bomb: Phaser.Sprite): void {
        bomb.body.velocity.y = -100;
        if (bomb.body.y < 200) {
            bomb.kill();
        }
    }

    private handleBombsBoatCollision(boat: Phaser.Sprite,
                                     bomb: Phaser.Sprite): void {
        bomb.kill();
        boat.body.reset();
        this.createExplosionAt(bomb.body.x, bomb.body.y);
        if (--this.lives <= 0) {
            this.setScene('Lose');
        }
    }

    private createExplosionAt(x: number, y: number) {
        var expl: Phaser.Sprite;
        expl = this.game.add.sprite(x, y, 'explosionAnim', 0);
        expl.anchor.setTo(0.5, 0.5);
        expl.animations.add('exploding',
                            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                            20, false, true);
        expl.animations.play('exploding', 20, false);
    }

    public setScene(sceneName: string) {
        this.barrels.forEach((b) => b.kill(), this, false);
        this.bombs.forEach((b) => b.kill(), this, false);
        this.submarines.forEach((b) => b.kill(), this, false);
        super.setScene(sceneName);
    }
}
