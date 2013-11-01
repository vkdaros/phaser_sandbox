/// <reference path="phaser.d.ts"/>



class Scene extends Phaser.State
{
    constructor(game: Phaser.Game)
    {
        super();
        this.game = game;
    }

    setScene(sceneName: string): void
    {
        this.game.state.start(sceneName, true, false);
    }

    preload(): void
    {
    }

    create(): void
    {
    }

    update(): void
    {
    }

    render(): void
    {
    }
}







class Menu extends Scene
{
    private text: Phaser.Text;
    private timer: number;



    constructor(game: Phaser.Game)
    {
        super(game);
        this.timer = 0.0;
    }

    preload(): void
    {
    }

    create(): void
    {
        this.text = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY,
            "- press SPACE to play -",
            { font: "48px Arial", fill: "#ff0044", align: "center" }
        );

        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
    }

    update(): void
    {
        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;

        if(keyboard.isDown(keys.SPACEBAR))
            this.setScene('Level');

        this.timer += this.game.time.elapsed * 0.001;
        if(this.timer > 0.35) {
            this.text.scale.y = 1.0 - this.text.scale.y;
            this.timer = 0.0;
        }
    }

    render(): void
    {
    }
}













class Level extends Scene
{
    private actor: Phaser.Sprite;
    private text: Phaser.Text;



    constructor(game: Phaser.Game)
    {
        super(game);
    }

    preload(): void
    {
        this.game.load.image('actor', 'assets/cokecan.png');
    }

    create(): void
    {
        this.actor = this.game.add.sprite(320, 240, 'actor');
        this.actor.anchor.x = 0.5;
        this.actor.anchor.y = 0.5;

        this.text = this.game.add.text(
            10, 10, "ESC: go back",
            { font: "14px sans-serif", fill: "#fff" }
        );
    }

    update(): void
    {
        var keyboard = this.game.input.keyboard;
        var keys = Phaser.Keyboard;
        var speed = 5;

        if(keyboard.isDown(keys.RIGHT))
            this.actor.angle += speed;
        if(keyboard.isDown(keys.LEFT))
            this.actor.angle -= speed;

        var t = this.game.time.totalElapsedSeconds();
        this.actor.scale.x = 1 + Math.abs(Math.cos(1.0 * Math.PI * t));
        this.actor.scale.y = 1 + Math.abs(Math.sin(1.0 * Math.PI * (t + 0.25)));

        if(keyboard.isDown(keys.ESC))
            this.setScene('Menu');
    }

    render(): void
    {
    }
}




