///<reference path="phaser.d.ts"/>
///<reference path="Scene.ts"/>
///<reference path="Submarine.ts"/>

class Boat extends Scene {
    private boat: Phaser.Sprite;
    private submarines: Phaser.Group;
    private barrels: Phaser.Group;
    private bombs: Phaser.Group;
    private explosions: Phaser.Group;
    private lastBoatShot: number;
    private lives: number;
    private level: number;
    private hudLevel: Phaser.Text;
    private hudLives: Phaser.Text;
    private explosionSound: Phaser.Sound;

    constructor(game: Phaser.Game) {
        super(game);
    }

    public create(): void {
        this.lives = 5;
        this.level = 1;

        this.game.add.sprite(0, 0, "backgroundImg");

        this.boat = this.game.add.sprite(320, 170, "boatImg");
        this.boat.body.maxVelocity.x = 100;
        this.boat.body.drag.x = 20;
        this.boat.anchor.x = 0.5;
        this.boat.anchor.y = 0.5;

        var height = this.boat.body.height;
        var width = 0.9 * this.boat.body.width;
        this.boat.body.setSize(width, height, 0, 0);

        this.submarines = this.game.add.group(null, "submarines");

        this.barrels = this.game.add.group(null, "barrels");
        for (var i: number = 0; i < 30; i++) {
            var barrel: Phaser.Sprite;
            barrel = this.barrels.create(9999, 9999, "barrelImg", "0", true);
            barrel.anchor.x = 0.5;
            barrel.anchor.y = 0.5;
            var width = barrel.body.width * 1.5;
            var height = barrel.body.height * 1.5;
            barrel.body.setSize(width, height, 0, 0)
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

        this.lastBoatShot = -100;

        var fontConfig = {
            font: "48px Arial",
            fill: "#222",
            align: "left"
        };
        this.hudLevel = this.game.add.text(this.game.width - 10, 10, "",
                                           fontConfig);
        this.hudLevel.anchor.x = 1;
        this.hudLives = this.game.add.text(10, 10, "", fontConfig);

        this.explosionSound = this.game.add.audio("explosionSound", 1, false);
        this.explosions = this.game.add.group(null, "explosions");
        
        this.jumpToLevel(this.level);
    }

    public update(): void {
        // No left/right command = slow down.
        this.boat.body.acceleration.x = 0;

        if (this.game.device.desktop) {
            this.handleBoatPointerMovement(this.game.input.activePointer);
            this.handleBoatKeyMovement();
        }
        else {
            this.handleBoatPointerMovement(this.game.input.pointer1);
            this.handleBoatPointerMovement(this.game.input.pointer2);
        }

        // lock boat inside the level
        this.boat.body.collideWorldBounds = true;

        // hud
        this.hudLevel["content"] = "Level: " + this.level;
        this.hudLives["content"] = "Lives: " + this.lives;

        // All submarines tries to fire.
        this.submarines.forEach((submarine) => submarine.shoot(), this, true);

        // handle bomb movement
        this.bombs.forEach(this.handleBombMovement, this, true);

        // handle barrel movement
        this.barrels.forEach(this.handleBarrelMovement, this, true);

        // handle collision bomb x boat
        this.game.physics.collide(this.bombs, this.boat,
                                  this.handleBombsBoatCollision,
                                  null, this);

        // handle collision barrel x submarines
        /*this.game.physics.collide(this.barrels, this.submarines,
                                  this.handleBarrelSubmarineCollision,
                                  null, this);*/
        this.hitTest(this.barrels, this.submarines,
                     this.handleBarrelSubmarineCollision,
                     null, this);
    }

    private handleBoatKeyMovement(): void {
        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;

        if (keyboard.isDown(keys.LEFT)) {
            this.boatToTheLeft();
        }
        if (keyboard.isDown(keys.RIGHT)) {
            this.boatToTheRight();
        }
        if (keyboard.isDown(keys.SPACEBAR)) {
            this.boatDropBarrel();
        }
    }

    private handleBoatPointerMovement(pointer: Phaser.Pointer): void {
        if (pointer.active && pointer.isDown) {
            var marginFraction = 0.35;
            var width = this.game.stage.scale.width;
            var leftBorder = width * marginFraction;
            var rightBorder = width * (1 - marginFraction);
            if (pointer.x < leftBorder) {
                this.boatToTheLeft();
            }
            else if (pointer.x > rightBorder) {
                this.boatToTheRight();
            }
            else {
                this.boatDropBarrel();
            }
        }
    }

    private boatToTheRight(): void {
        this.boat.body.acceleration.x = 100;
    }

    private boatToTheLeft(): void {
        this.boat.body.acceleration.x = -100;
    }

    private boatDropBarrel(): void {
        if (this.game.time.totalElapsedSeconds() > this.lastBoatShot + 1) {
            var barrel: Phaser.Sprite = this.barrels.getFirstDead();
            if (barrel) {
                barrel.body.y = this.boat.position.y + 30;
                barrel.body.x = this.boat.position.x;
                barrel.revive();
                barrel.body.velocity.y = 100;
            }
            this.lastBoatShot = this.game.time.totalElapsedSeconds();
        }
    }

    private hitTest(groupA: Phaser.Group, groupB: Phaser.Group,
                    overlapCallback: Function, processCallback?: Function,
                    callbackContext?: Object): void {
        overlapCallback = overlapCallback || null;
        processCallback = processCallback || null;
        callbackContext = callbackContext || overlapCallback;

        var overlaps = this.game.physics['overlap'];
        var handleCollision =
            (a, b) => overlapCallback.call(callbackContext, a, b);
        var proc = processCallback;

        groupA.forEach((a) => {
            groupB.forEach((b) => {
                if (overlaps(a, b)) {
                    if (!proc || (proc && proc(a, b))) {
                        handleCollision(a, b);
                    }
                }
            }, this, false)
        }, this, false);
    }

    private createSubmarines(submarines: Phaser.Group, n: number) {
        for (var i: number = 0; i < n; i++) {
            var submarine = new Submarine(this.game, this.submarineShot,
                                          this.bombs);
            submarines.add(submarine);
        }
    }

    public submarineShot(x: number, y: number, bombs: Phaser.Group): void {
        var bomb: Phaser.Sprite = bombs.getFirstDead();
        if (bomb) {
            bomb.body.x = x;
            bomb.body.y = y;
            bomb.revive();
        }
    }

    private handleBarrelSubmarineCollision(barrel: Phaser.Sprite,
                                           submarine: Phaser.Sprite): void {
        barrel.kill();
        submarine.kill();
        this.createExplosionAt(barrel.body.x, barrel.body.y);
        if (this.submarines.countLiving() == 0) {
            this.lives++;
            this.jumpToLevel(this.level + 1);
        }
    }

    private handleBarrelMovement(barrel: Phaser.Sprite): void {
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

        var acc = boat.body.acceleration.x;
        var vel = boat.body.velocity.x;
        boat.body.reset();
        boat.body.velocity.x = vel/2;
        boat.body.acceleration.x = acc/2;

        this.createExplosionAt(bomb.body.x, bomb.body.y);
        if (--this.lives == 0) {
            this.setScene("Lose");
        }
    }

    private createExplosionAt(x: number, y: number): void {
        var expl: Phaser.Sprite;
        expl = this.explosions.create(x, y, "explosionAnim", "0", true);
        expl.anchor.setTo(0.5, 0.5);
        expl.animations.add("exploding",
                            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                            20, false, true);
        expl.animations.play("exploding", 20, false, true);
        this.explosionSound.play("", 0, 0.8, false);
    }

    public setScene(sceneName: string): void {
        this.barrels.forEach((b) => b.kill(), this, false);
        this.bombs.forEach((b) => b.kill(), this, false);
        this.submarines.forEach((b) => b.kill(), this, false);
        this.explosions.forEach((b) => b.kill(), this, false);
        super.setScene(sceneName);
    }

    private jumpToLevel(level: number): void {
        if (level >= 10) {
            this.setScene("Win");
        }
        else {
            this.level = level;
            this.createSubmarines(this.submarines, this.level);
            if (level > 1) {
                this.displayLevelUpFx();
            }
        }
    }

    private displayLevelUpFx(): void {
        var fontConfig = {
            font: "72px Arial",
            fill: "#b22",
            align: "center"
        };

        var text: Phaser.Text;
        text = this.game.add.text(480, 240, "LEVEL UP!", fontConfig);
        text.anchor.setTo(0.5, 0.5);

        var t: Phaser.Tween;
        t = this.game.add.tween(text);
        t.to( {y: 0, alpha: 0}, 1500, Phaser.Easing["Linear"].None);
        t.start(1);
    }

/*
    public render(): void {
        var draw = (s) => this.game.debug.renderSpriteBody(s, "rgba(0,255,0,0.5)");
        draw(this.boat);
        this.submarines.forEach((submarine) => draw(submarine), this, true);
        this.barrels.forEach((barrel) => draw(barrel), this, true);
        this.bombs.forEach((bomb) => draw(bomb), this, true);

        if (this.game.device.desktop) {
            this.game.debug.renderPointer(this.game.input.activePointer);
        }
        else {
            this.game.debug.renderPointer(this.game.input.pointer1);
            this.game.debug.renderPointer(this.game.input.pointer2);
        }
    }
*/
}
