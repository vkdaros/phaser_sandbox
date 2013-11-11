///<reference path="phaser.d.ts"/>

class Submarine extends Phaser.Sprite {
    public game: Phaser.Game;
    private duration: number;

    constructor(game: Phaser.Game) {
        this.game = game;
        super(game, 0, 0, "submarineLongImg", 0);
        this.create();
    }

    public create(): void {
        var plusMinus: number = 2 * Math.round(Math.random()) - 1;
        this.x = 480  + plusMinus * (550 + Math.random() * 100);
        this.y = 230 + Math.random() * 350;
        this.duration = 5000 + Math.random() * 5000;

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.animations.add("turnLeft", [0]);
        this.animations.add("turnRight", [1]);

        if (plusMinus < 0) {
            this.moveRight();
        }
        else {
            this.moveLeft();
        }
        console.log("Created");
    }

    private moveRight() {
        // Hack! Should be: Phaser.Easing.Linear.None;
        var LinearNone = Phaser.Easing["Linear"].None;

        console.log("To the right!");
        this.animations.play("turnRight");
        var t: Phaser.Tween = this.game.add.tween(this);
        t.to({x: 900}, this.duration, LinearNone);
        t.onComplete.add(this.moveLeft, this);
        t.start(1);
    }

    private moveLeft() {
        // Hack! Should be: Phaser.Easing.Linear.None;
        var LinearNone = Phaser.Easing["Linear"].None;

        console.log("To the left!");
        this.animations.play("turnLeft");
        var t: Phaser.Tween = this.game.add.tween(this);
        t.to({x: 50}, this.duration, LinearNone);
        t.onComplete.add(this.moveRight, this);
        t.start(1);
    }
}
