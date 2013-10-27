class Test1
{
    private actor;

    constructor()
    {
        game = new Phaser.Game(640, 480, Phaser.CANVAS, '', {
            preload: this.preload, create: this.create, update: this.update
        }, false, false);
    }

    private preload()
    {
        game.load.image('actor', 'cokecan.png');
    }

    private create(): void
    {
        this.actor = game.add.sprite(320, 240, 'actor');
        this.actor.anchor.x = 0.5;
        this.actor.anchor.y = 0.5;
    }

    private update(): void
    {
        var keyboard = game.input.keyboard;
        var keys = Phaser.Keyboard;
        var speed = 5;

        if(keyboard.isDown(keys.RIGHT))
            this.actor.angle += speed;
        if(keyboard.isDown(keys.LEFT))
            this.actor.angle -= speed;

        var t = game.time.totalElapsedSeconds();
        this.actor.scale.x = 1 + Math.abs(Math.cos(1.0 * Math.PI * t));
        this.actor.scale.y = 1 + Math.abs(Math.sin(1.0 * Math.PI * (t + 0.25)));
    }
}

var game;
declare var Phaser;
window.onload = (function() { var test1 = new Test1(); });
